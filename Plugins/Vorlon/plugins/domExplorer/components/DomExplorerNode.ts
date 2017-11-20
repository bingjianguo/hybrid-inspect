declare var VORLON: any;
import DomExplorerNodeAttribute from './DomExplorerNodeAttribute';
const { FluentDOM, Tools } = VORLON;

export default class DomExplorerNode {
  private static _spaceCheck = /[^\t\n\r ]/;
  public element: HTMLElement;
  public header: HTMLElement;
  public headerAttributes: HTMLElement;
  public node: PackagedNode;
  public contentContainer: HTMLElement;
  public attributes: DomExplorerNodeAttribute[] = [];
  public childs: DomExplorerNode[] = [];
  plugin: DOMExplorerDashboard;
  parent: DomExplorerNode;

  constructor(plugin: DOMExplorerDashboard, parent: DomExplorerNode, parentElt: HTMLElement, node: PackagedNode, oldNode?: DomExplorerNode) {
    this.parent = parent;
    this.node = node;
    this.plugin = plugin;
    if (oldNode) {
      this.parent = oldNode.parent;
      this.element = oldNode.element;
      this.element.innerHTML = "";
      this.render(parentElt, true);
    }
    else {
      this.render(parentElt);
    }
  }

  public dispose() {
    for (var i = 0, l = this.childs.length; i < l; i++) {
      this.childs[i].dispose();
    }

    this.plugin = null;
    this.parent = null;
    this.element = null;
    this.header = null;
    this.headerAttributes = null;
    this.contentContainer = null;
  }


  public update(node: PackagedNode) {
    this.plugin.refreshButton.removeAttribute('changed');
    var newNode = this.insertReceivedObject(node, this.plugin._rootNode);

    if (node.highlightElementID)
      this.openNode(node.highlightElementID);
  }
  private insertReceivedObject(receivedObject: PackagedNode, root: DomExplorerNode): DomExplorerNode {
    if ((root && root.node && root.node.internalId === this.plugin.clikedNodeID) || (this.plugin.clikedNodeID === null && root.node.internalId === receivedObject.internalId)) {
      this.plugin.clikedNodeID = null;
      var newNode: DomExplorerNode;
      if (root.parent === null) {
        newNode = new DomExplorerNode(root.plugin, null, this.plugin.treeDiv, receivedObject, root);
      } else {
        newNode = new DomExplorerNode(root.plugin, root.parent, root.parent.element, receivedObject, root);
      }
      root.childs = newNode.childs;
      root.node.hasChildNodes = false;
      return root;
    }
    else {
      if (root && root.childs && root.childs.length) {
        for (var index = 0; index < root.childs.length; index++) {
          var res = this.insertReceivedObject(receivedObject, root.childs[index])
          if (res) {
            root.childs[index] = res;
            return root;
          }
        }
      }
    }
  }

  openNode(highlightElementID: string) {
    $('#plusbtn' + highlightElementID).trigger('click');
    $('.treeNodeSelected').removeClass('treeNodeSelected');
    var domnode = $('#domNode' + highlightElementID);
    if (domnode.length == 0) {
      return;
    }

    domnode.addClass('treeNodeSelected');
    var container = $(this.plugin.treeDiv);
    container.animate({ scrollTop: domnode.offset().top - container.offset().top + container.scrollTop() });
  }

  selected(selected: boolean) {
    if (selected) {
      $('.treeNodeSelected').removeClass('treeNodeSelected');
      Tools.AddClass(this.element, 'treeNodeSelected');
    } else {
      $('.treeNodeSelected').removeClass('treeNodeSelected');
    }
  }

  render(parent: HTMLElement, isUpdate: boolean = false) {
    if (this.node.name === "#comment") {
      this.renderCommentNode(parent, isUpdate);
    }
    else if (this.node.type == "3") {
      this.renderTextNode(parent, isUpdate);
    } else {
      this.renderDOMNode(parent, isUpdate);
    }
  }
  sendTextToClient() {
    this.plugin.sendCommandToClient('setElementValue', {
      value: this.element.innerHTML,
      order: this.parent.node.internalId
    });
    this.plugin.undoEditable(this.element);
  }
  renderCommentNode(parentElt: HTMLElement, isUpdate: boolean = false) {
    if (DomExplorerNode._spaceCheck.test(this.node.content)) {

      if (!isUpdate) {
        var textNode = new FluentDOM('span', 'nodeTextContent nodeComment', parentElt);
        this.element = textNode.element;
        textNode.text(this.node.content.trim()).editable(false);
      }
      else {
        this.element.innerHTML = "";
      }
    }
  }
  renderTextNode(parentElt: HTMLElement, isUpdate: boolean = false) {
    if (DomExplorerNode._spaceCheck.test(this.node.content)) {
      if (!isUpdate) {
        var textNode = new FluentDOM('span', 'nodeTextContent', parentElt);
        this.element = textNode.element;
        textNode.text(this.node.content.trim())
          .editable(false)
          .blur(() => this.sendTextToClient())
          .keydown((evt) => {
            if (evt.keyCode === 13 || evt.keyCode === 9) { // Enter or tab
              this.sendTextToClient();
            }
          }).click(() => {
          this.plugin.makeEditable(this.element);
        });
      }
      else {
        this.element.innerHTML = "";
      }
    }
  }

  renderDOMNode(parentElt: HTMLElement, isUpdate: boolean = false) {
    parentElt.setAttribute('data-has-children', '');
    if (!isUpdate) {
      var root = new FluentDOM('DIV', 'domNode', parentElt);
      this.element = root.element;
    }
    else {
      this.element.innerHTML = "";
    }
    this.element.id = "domNode" + this.node.internalId;
    this.renderDOMNodeContent();
  }

  renderDOMNodeContent() {
    var root = FluentDOM.forElement(this.element);
    root.append('BUTTON', 'treeNodeButton',(nodeButton) => {
      nodeButton.attr("aria-label", "This is a tree node button that allows you to navigate trought the DOM tree");
      nodeButton.element.id = "plusbtn" + this.node.internalId;
      if (this.node.hasChildNodes && (!this.node.children || this.node.children.length === 0)) {
        Tools.AddClass(this.element, "collapsed");
        nodeButton.attr("data-collapsed", "");
      } else {
        Tools.RemoveClass(this.element, "collapsed");
      }
      nodeButton.attr('button-block', '');
      nodeButton.click(() => {
        if (this.node.hasChildNodes && !nodeButton.element.className.match('loading')) {
          Tools.AddClass(nodeButton.element, "loading");
          this.plugin.clikedNodeID = this.node.internalId;
          this.plugin.sendCommandToClient('refreshNode', {
            order: this.node.internalId
          });
        }
      });
    });

    var that = this;
    var menu = (idtarget) => {
      $('.b-m-mpanel').remove();
      var option = {
        width: 180, items: [
          {
            text: "Edit content as HTML", icon: "", alias: "1-1", action: () => {
            that.parent.plugin.select(that);
            that.parent.plugin.sendCommandToClient('getInnerHTML', {
              order: that.plugin._selectedNode.node.internalId
            });
            $("#accordion .htmlsection").trigger('click');
          }
          },
          {
            text: "Add attribute", alias: "1-3", icon: "", action: () => {
            var attr = new DomExplorerNodeAttribute(that, "name", "value");
            that.attributes.push(attr);
          }
          }
        ]
      };
      $('.b-m-mpanel').remove();
      $(idtarget).contextmenu(option);

    }
    root.append("SPAN", "treeNodeHeader",(header) => {
      this.header = header.element;
      header.click(() => this.plugin.select(this));
      header.createChild("SPAN", "opentag").text('<');
      var nodename = header.createChild("SPAN", "nodeName");
      nodename.text(this.node.name);
      header.element.id = "treeNodeHeader-" + this.node.internalId;
      $(this.header).data("internalid", this.node.internalId);
      this.headerAttributes = header.createChild("SPAN", "attributes").element;
      this.node.attributes.forEach((attr) => {
        this.addAttribute(attr[0], attr[1]);
      });
      header.createChild("SPAN", "closetag").text('>');

      nodename.element.addEventListener("contextmenu",(evt) => {
        menu("#treeNodeHeader-" + that.node.internalId);
      });
    });
    if (this.node.isEmpty) {
      this.header.classList.add('emptynode');
    }
    else {
      root.append('DIV', 'nodeContentContainer',(container) => {
        this.contentContainer = container.element;
        if (this.node.hasChildNodes) {
          this.contentContainer.id = "vorlon-" + this.node.internalId;
        }

        var nodes = this.node.children;
        if (nodes && nodes.length) {
          for (var index = 0; index < nodes.length; index++) {
            var child = nodes[index];
            if (child.nodeType != 3) {
              var node = new DomExplorerNode(this.plugin, this, this.contentContainer, child);
              this.childs.push(node);
            }
          }
        }
      });
    }
    if (this.node.name) {
      if (this.node.name != "input" && this.node.name != "meta" && this.node.name != "link" && this.node.name != "img" && this.node.name != "br" && this.node.name != "hr") {
        root.append("DIV", "treeNodeClosingText",(footer) => {
          footer.createChild("SPAN", "openclosingtag").text('</');
          footer.createChild("SPAN", "nodeName").text(this.node.name);
          footer.createChild("SPAN", "closetag").text('>');
          if (!footer.element.dataset)
            footer.element.dataset = {};
          $(footer.element).data("internalid", this.node.internalId);
          footer.element.id = `treeNodeClosingText${ this.node.internalId}`;
          footer.element.addEventListener("contextmenu",() => {
            menu("#treeNodeClosingText" + this.node.internalId);
          });
        });
      }
      else {
        root.element.classList.add('notexpansible');
        (<HTMLElement>  this.header.querySelector('.closetag')).innerHTML = "/>";
      }
    }
    // Main node

    // Tools
    if (this.node.id) {
      root.createChild("span", "treeNodeTools fa fa-terminal").click(() => {
        this.plugin.sendCommandToPluginDashboard("CONSOLE", "setorder", {
          order: this.node.id
        });
      });
    }
  }

  addAttribute(name: string, value: string) {
    var attr = new DomExplorerNodeAttribute(this, name, value);
    this.attributes.push(attr);
  }
}
