declare var $: any;
declare var VORLON: any;
declare var ReactDOM: any;
declare var React: any;

import DomExplorer from './components/DomExplorer';
import DomExplorerNode from './components/DomExplorerNode';
import DomExplorerNodeAttribute from './components/DomExplorerNodeAttribute';
import DomExplorerPropertyEditor from './components/DomExplorerPropertyEditor';
import DomExplorerPropertyEditorItem from './components/DomExplorerPropertyEditorItem';
import DomSettings from './components/DomSettings';
import DashboardCommands from './components/DashboardCommands';

const { DashboardPlugin, Core, Tools, FluentDOM } = VORLON;


export class DOMExplorerDashboard extends DashboardPlugin {
  private _lastReceivedObject = null;
  private _containerDiv: HTMLElement;
  public treeDiv: HTMLElement;
  public styleView: HTMLElement;
  private _computedsection: HTMLElement;
  private _dashboardDiv: HTMLDivElement;
  public refreshButton: Element;
  public inspectButton: Element;
  public clikedNodeID = null;
  public _selectedNode: DomExplorerNode;
  public _highlightedNode: string;
  public _rootNode: DomExplorerNode;
  private _autorefresh: boolean = false;
  public _innerHTMLView: HTMLTextAreaElement;
  private _margincontainer: HTMLElement;
  private _bordercontainer: HTMLElement;
  private _paddingcontainer: HTMLElement;
  private _sizecontainer: HTMLElement;
  public _editablemode: boolean = false;
  private _editableElement: HTMLElement;
  private _searchinput: HTMLInputElement;
  private _searchresults: HTMLInputElement;
  private _stylesEditor: DomExplorerPropertyEditor;
  private _lengthSearch;
  private _positionSearch;
  private _selectorSearch;
  private _clientHaveMutationObserver: boolean = false;

  constructor() {
    super("domExplorer", "control.html", "control.css");
    this._id = "DOM";
    this._ready = false;
  }

  public startDashboardSide(div: HTMLDivElement = null): void {
    this._dashboardDiv = div;
    this._insertHtmlContentAsync(this._dashboardDiv,(filledDiv: HTMLElement) => {

      this._containerDiv = filledDiv;
      this.treeDiv = Tools.QuerySelectorById(filledDiv, "treeView");
      this._innerHTMLView = <HTMLTextAreaElement> Tools.QuerySelectorById(filledDiv, "innerHTMLView");

      this._margincontainer = <HTMLTextAreaElement> Tools.QuerySelectorById(filledDiv, "margincontainer");
      this._bordercontainer = <HTMLTextAreaElement> Tools.QuerySelectorById(filledDiv, "bordercontainer");
      this._paddingcontainer = <HTMLTextAreaElement> Tools.QuerySelectorById(filledDiv, "paddingcontainer");
      this._sizecontainer = <HTMLTextAreaElement> Tools.QuerySelectorById(filledDiv, "sizecontainer");
      this._computedsection = <HTMLTextAreaElement> Tools.QuerySelectorById(filledDiv, "computedsection");

      this._searchinput = <HTMLInputElement> Tools.QuerySelectorById(filledDiv, "searchinput");
      this._searchresults = <HTMLInputElement> Tools.QuerySelectorById(filledDiv, "searchresults");
      this.styleView = Tools.QuerySelectorById(filledDiv, "styleView");
      var domSettings = new DomSettings(this);
      this.searchDOM();
      this.refreshButton = this._containerDiv.querySelector('x-action[event="refresh"]');
      this.inspectButton = this._containerDiv.querySelector('x-action[event="inspect"]');
      this._stylesEditor = new DomExplorerPropertyEditor(this);
      this._containerDiv.addEventListener('inspectFromClient',() => {
        this.sendCommandToClient('inspect');
      });
      this._containerDiv.addEventListener('refresh', () => {

        this.sendCommandToClient('refresh');
      });
      this._containerDiv.addEventListener('gethtml',() => {
        this.sendCommandToClient('getInnerHTML', {
          order: this._selectedNode.node.internalId
        });
      });

      this._containerDiv.addEventListener('savehtml',() => {
        this.clikedNodeID = this._selectedNode.node.internalId;
        this.sendCommandToClient('saveinnerHTML', {
          order: this._selectedNode.node.internalId,
          innerhtml: this._innerHTMLView.value
        });
      });
      this.treeDiv.addEventListener('click',(e: Event) => {
        var button = <HTMLElement>e.target;
        if (button.className.match('treeNodeButton')) {
          button.hasAttribute('data-collapsed') ? button.removeAttribute('data-collapsed') : button.setAttribute('data-collapsed', '');
        }
      });

      this.treeDiv.addEventListener('mouseenter',(e: Event) => {
        var node = <any>e.target;
        var parent = node.parentElement;
        var isHeader = node.className.match('treeNodeHeader');
        if (isHeader || parent.className.match('treeNodeClosingText')) {
          if (isHeader) {
            parent.setAttribute('data-hovered-tag', '');
            var id = $(node).data('internalid');
            if (id) {
              this.hoverNode(id);
            }
          }
          else {
            parent.parentElement.setAttribute('data-hovered-tag', '');
            var id = $(parent).data('internalid');
            if (id) {
              this.hoverNode(id);
            }
          }
        }
      }, true);

      this.treeDiv.addEventListener('mouseleave',(e: Event) => {
        var node = <HTMLElement>e.target;
        if (node.className.match('treeNodeHeader') || node.parentElement.className.match('treeNodeClosingText')) {
          var hovered = this.treeDiv.querySelector('[data-hovered-tag]');
          if (hovered) hovered.removeAttribute('data-hovered-tag');
          this.hoverNode(null, true);
          // var id = $(node).data('internalid');
          // if (id) {
          //     this.hoverNode(id, true);
          // }
          // else {
          //     var id = $(node.parentElement).data('internalid');
          //     if (id) {
          //         this.hoverNode(id, true);
          //     }
          // }
        }

      }, true);

      $('.domload-spinner', this._containerDiv).on('dblclick', () => {
        location.reload();
      });

      $("#accordion h3", this._containerDiv).click((elt) => {
        $('.visible', elt.target.parentElement).removeClass('visible');
        $('#' + elt.target.className, elt.target.parentElement).addClass('visible');
        elt.target.classList.add('visible');
        if (elt.target.className.indexOf("htmlsection") !== -1) {
          this.sendCommandToClient('getInnerHTML', {
            order: this._selectedNode.node.internalId
          });
        }
        else if (elt.target.className.indexOf("layoutsection") !== -1) {
          this.sendCommandToClient('getStyle', {
            order: this._selectedNode.node.internalId
          });
        }
        else if (elt.target.className.indexOf("computedsection") !== -1) {
          this.sendCommandToClient('getComputedStyleById', {
            order: this._selectedNode.node.internalId
          });
        }
      });
      this._ready = true;
      this.sendCommandToClient("getMutationObeserverAvailability");
    });
  }

  private searchDOM() {

    this._searchinput.addEventListener("keydown",(evt) => {
      if (evt.keyCode === 13 || evt.keyCode === 9) { // Enter or tab
        evt.preventDefault();
        this._searchresults.innerHTML = "";
        this._searchresults.classList.remove('noresults');
        this._searchresults.classList.remove('found');
        this._selectorSearch = this._searchinput.value;
        if (this._selectorSearch === this._searchinput.value) {
          this.sendCommandToClient("searchDOMBySelector", { selector: this._searchinput.value, position: this._positionSearch });
        }
        else {
          this._positionSearch = 0;
          this.sendCommandToClient("searchDOMBySelector", { selector: this._searchinput.value });
        }
      }
    });
  }

  public makeEditable(element: HTMLElement): void {
    if (element.contentEditable == "true") { return; }
    var range = document.createRange();
    var sel = window.getSelection();
    range.setStart(element, 1);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    if (this._editableElement)
      this.undoEditable(this._editableElement);
    element.contentEditable = "true";
    this._editablemode = true;
    this._editableElement = element;
    Tools.AddClass(element, "editable");
    $(element).focus();
    $(element).closest(".treeNodeSelected").addClass("editableselection");
  }

  public undoEditable(element: HTMLElement): void {
    this._editablemode = false;
    element.contentEditable = "false";
    Tools.RemoveClass(element, "editable");
    $(element).closest(".treeNodeSelected").addClass("editableselection");
    this._editableElement = null;
  }

  public onRealtimeMessageReceivedFromClientSide(receivedObject: any): void {
    if (receivedObject.type === "contentchanged" && !this._editablemode && (!this._clientHaveMutationObserver || this._autorefresh == false)) {
      this.dirtyCheck();
    } else if (receivedObject.type === "contentchanged" && receivedObject.internalId !== null && this._clientHaveMutationObserver) {
      if (this._autorefresh)
        this.sendCommandToClient('refreshNode', {
          order: receivedObject.internalId
        });
      else
        this.dirtyCheck();
    }
  }

  public contentChanged() {
    this.refreshButton.setAttribute('changed', '');
  }
  public setInnerHTMLView(data: any) {
    this._innerHTMLView.value = data.innerHTML;
  }

  public setComputedStyle(data: Array<any>) {
    if (data && data.length) {
      data.forEach((item) => {
        var root = new FluentDOM('div', 'styleWrap', this._computedsection);
        root.append('span', 'styleLabel',(span) => {
          span.text(item.name);
        });
        root.append('span', 'styleValue',(span) => {
          span.text(item.value);
        });
      });
    }
  }

  public setLayoutStyle(data: LayoutStyle) {
    this._margincontainer.parentElement.parentElement.classList.remove('hide');
    $('.top', this._margincontainer).html(data.margin.top);
    $('.bottom', this._margincontainer).html(data.margin.bottom);
    $('.left', this._margincontainer).html(data.margin.left);
    $('.right', this._margincontainer).html(data.margin.right);
    $('.top', this._bordercontainer).html(data.border.topWidth);
    $('.bottom', this._bordercontainer).html(data.border.bottomWidth);
    $('.left', this._bordercontainer).html(data.border.leftWidth);
    $('.right', this._bordercontainer).html(data.border.rightWidth);
    $('.top', this._paddingcontainer).html(data.padding.top);
    $('.bottom', this._paddingcontainer).html(data.padding.bottom);
    $('.left', this._paddingcontainer).html(data.padding.left);
    $('.right', this._paddingcontainer).html(data.padding.right);
    var w = data.size.width;
    if (w && w.indexOf('.') !== -1) {
      w = w.split('.')[0] + 'px';
    }
    var h = data.size.height;
    if (h && h.indexOf('.') !== -1) {
      h = h.split('.')[0] + 'px';
    }
    $(this._sizecontainer).html(w + " x " + h);
  }

  public searchDOMByResults(data: any) {
    this._lengthSearch = data.length;
    this._selectorSearch = data.selector;
    this._positionSearch = data.position;
    if (this._selectorSearch) {
      if (this._lengthSearch) {
        this._searchresults.classList.remove('noresults');
        this._searchresults.classList.add('found');
        this._searchresults.setAttribute('content', this._positionSearch + "/" + this._lengthSearch);
      } else {
        this._searchresults.classList.remove('found');
        this._searchresults.classList.add('noresults');
      }
    }
    else {
      this._searchresults.classList.remove('noresults');
      this._searchresults.classList.remove('noresults');
    }
  }

  public mutationObeserverAvailability(data: any) {
    this._clientHaveMutationObserver = data.availability;
  }

  public initDashboard(root: PackagedNode) {
    this.refreshButton.removeAttribute('changed');
    this._lastReceivedObject = root;
    while (this.treeDiv.hasChildNodes()) {
      this.treeDiv.removeChild(this.treeDiv.lastChild);
    }
    if (this._rootNode)
      this._rootNode.dispose();
    if (this.treeDiv.parentElement)
      this.treeDiv.parentElement.classList.add('active');
    this._rootNode = new DomExplorerNode(this, null, this.treeDiv, root);
  }

  public updateDashboard(node: PackagedNode) {
    if (this._rootNode) {
      this._rootNode.update(node);
    }
  }

  public setAutorefresh(value: boolean) {
    this._autorefresh = value;
  }

  public getContainerDiv(): HTMLElement {
    return this._containerDiv;
  }

  dirtyCheck() {
    this.refreshButton.setAttribute('changed', '');
    if (this._autorefresh) {
      this.sendCommandToClient('refresh');
    }
  }

  hoverNode(internalId: string, unselect: boolean = false) {
    this._highlightedNode = internalId;
    if (!internalId) {
      this.sendCommandToClient('unhighlight', {
        order: null
      });
    }
    else if (unselect) {
      setTimeout(()=>{
        if (!this._highlightedNode){
          this.sendCommandToClient('unhighlight', {
            order: internalId
          });
        }
      }, 5);
    }
    else {
      this.sendCommandToClient('highlight', {
        order: internalId
      });
    }

  }

  select(selected: DomExplorerNode) {
    $("#accordion .stylessection ").trigger('click');
    this._margincontainer.parentElement.parentElement.classList.add('hide');
    if (this._selectedNode) {
      this._selectedNode.selected(false);
      this.sendCommandToClient('unselect', {
        order: this._selectedNode.node.internalId
      });
    } else {
      this.sendCommandToClient('unselect', {
        order: null
      });
    }

    if (selected) {
      this._selectedNode = selected;
      this._selectedNode.selected(true);
      this.sendCommandToClient('select', {
        order: this._selectedNode.node.internalId
      });
      this._stylesEditor.generateStyles(selected.node, selected.node.internalId);
      //this._stylesEditor.generateStyles(selected.node, selected.node.internalId);
      this._innerHTMLView.value = "";
    } else {
      this._selectedNode = null;
    }
  }

  setNodeStyle(internalId: string, styles){
    if (this._selectedNode && this._selectedNode.node.internalId == internalId){
      this._stylesEditor.generateStyles(this._selectedNode.node, this._selectedNode.node.internalId, styles);
    }
  }
}

DOMExplorerDashboard.prototype.DashboardCommands = DashboardCommands;

Core.RegisterDashboardPlugin(new DOMExplorerDashboard());