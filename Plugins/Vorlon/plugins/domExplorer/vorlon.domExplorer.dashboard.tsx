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
  private root: any;

  constructor() {
    super("domExplorer", "control.html", ['control.css','vorlon.domExplorer.dashboard.css']);
    this._id = "DOM";
    this._ready = false;
  }

  public startDashboardSide(div: HTMLDivElement = null): void {
    this._dashboardDiv = div;
    this._insertHtmlContentAsync(this._dashboardDiv,(filledDiv: HTMLElement) => {
      this.root = ReactDOM.render(
        <DomExplorer ref={ ele => {
          this.refreshButton = ele.refreshButton;
          this.treeDiv = ele.treeDiv;
          this.styleView = ele.styleView;
          this.innerHTMLView = ele.innerHTMLView;
          this.computedsection = ele.computedsection;
        }}/>, 
        div
      );

      $('#pluginsPaneTop').on('resize', (e, maxHeight) => {
        this.root.externalSetProps({
          maxHeight 
        });
      });

      $(window).trigger('PluginLoadFinish');

      this._stylesEditor = new DomExplorerPropertyEditor(this);
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

  /**
   * 从client部分反馈的websocket信息
   * @param receivedObject 
   */
  public onRealtimeMessageReceivedFromClientSide(receivedObject: any): void {
    if ( receivedObject.type === "contentchanged" 
      && !this._editablemode 
      && (!this._clientHaveMutationObserver || this._autorefresh == false)
    ) {
      this.dirtyCheck();
    } else if (receivedObject.type === "contentchanged" 
      && receivedObject.internalId !== null 
      && this._clientHaveMutationObserver
    ) {
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
  /**
   * 获取页面的DOM内容 innerHTML
   * @param data 
   */
  public setInnerHTMLView(data: any) {
    this.root.externalSetProps({
      innerHTML: data
    })

  }

  /**
   * 
   * @param data 设置dashboard 中computedSection的内容
   */
  public setComputedStyle(data: Array<any>) {
    this.root.externalSetProps({ 
      computedStyle: data
    });
  }

  /**
   * 接收client返回的dom node节点的样式信息，并渲染在页面上
   * @param internalId 
   * @param styles 
   */
  setNodeStyle(internalId: string, styles){
    if (this._selectedNode && this._selectedNode.node.internalId == internalId){
      this._stylesEditor.generateStyles(this._selectedNode.node, this._selectedNode.node.internalId, styles);
    }
  }

  public setLayoutStyle(data) {
    this.root.externalSetProps({ 
      layoutStyle: data
    });
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

  /**
   * 选中dom树中的某个节点，触发事件
   * @param selected 
   */
  select(selected: DomExplorerNode) {
    // this._margincontainer.parentElement.parentElement.classList.add('hide');
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

      this.root.externalSetProps({
        internalId: this._selectedNode.node.internalId,
        computedStyle: null,
        layoutStyle: null,
        innerHTML: null,
        select: true,
      });
    } else {
      this._selectedNode = null;
    }
  }

}

DOMExplorerDashboard.prototype.DashboardCommands = DashboardCommands;

Core.RegisterDashboardPlugin(new DOMExplorerDashboard());