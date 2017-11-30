declare var VORLON: any;
const { FluentDOM } = VORLON;


export default class DomExplorerNodeAttribute {
  public parent: DomExplorerNode;
  public element: HTMLElement;
  public name: string;
  public value: string;

  constructor(parent: DomExplorerNode, name: string, value: string) {
    this.parent = parent;
    this.name = name;
    this.value = value;
    this.render();
  }
  eventNode(nodeName, nodeValue, parentElementId: string) {
    var oldNodeName = nodeName.innerHTML;
    var that = this;
    var sendTextToClient = (attributeName, attributeValue, nodeEditable) => {
      this.parent.plugin.sendCommandToClient('attribute', {
        attributeName: attributeName,
        attributeOldName: oldNodeName,
        attributeValue: attributeValue,
        order: this.parent.node.internalId
      });

      if (!attributeName) { // delete attribute
        nodeName.parentElement.removeChild(nodeName);
        nodeValue.parentElement.removeChild(nodeValue);
      }
      that.parent.plugin.undoEditable(nodeEditable);
    }
    var menu = () => {

      var option = {
        width: 180, items: [
          {
            text: "Edit attribute name", icon: "", alias: "1-1", action: () => {
            that.parent.plugin.makeEditable(nodeName);
          }
          },
          {
            text: "Edit attribute value", alias: "1-2", icon: "", action: () => {
            that.parent.plugin.makeEditable(nodeValue);
          }
          },
          {
            text: "Edit content as HTML", alias: "1-3", icon: "", action: () => {
            that.parent.plugin.select(that.parent);
            that.parent.plugin.sendCommandToClient('getInnerHTML', {
              order: that.parent.plugin._selectedNode.node.internalId
            });
            $("#accordion .htmlsection").trigger('click');
          }
          },
          {
            text: "Add attribute", alias: "1-4", icon: "", action: () => {
            that.parent.addAttribute("name", "value");
          }
          },
          {
            text: "Delete attribute", alias: "1-5", icon: "", action: () => {
            sendTextToClient.bind(that)("", nodeValue.innerHTML, nodeValue);
          }
          }
        ]
      };
      $('.b-m-mpanel').remove();
      $("#" + parentElementId).contextmenu(option);
    }

    nodeValue.addEventListener("contextmenu",() => {
      if (nodeValue.contentEditable != "true" && nodeName.contentEditable != "true")
        menu.bind(this)("value");
    });
    nodeValue.addEventListener("click",(e) => {
      if(!this.uriCheck("click", nodeValue, e))
        this.parent.plugin.makeEditable(nodeValue);
    });
    nodeName.addEventListener("click",() => {
      this.parent.plugin.makeEditable(nodeName);
    });
    nodeName.addEventListener("contextmenu",() => {
      if (nodeValue.contentEditable != "true" && nodeName.contentEditable != "true")
        menu.bind(this)("name");
    });
    nodeValue.addEventListener("blur",() => {
      sendTextToClient.bind(this)(nodeName.innerHTML, nodeValue.innerHTML, nodeValue);
    });
    nodeName.addEventListener("blur",() => {
      sendTextToClient.bind(this)(nodeName.innerHTML, nodeValue.innerHTML, nodeName);
    });
    nodeName.addEventListener("keydown",(evt) => {
      if (evt.keyCode === 13 || evt.keyCode === 9) { // Enter or tab
        evt.preventDefault();
        sendTextToClient.bind(this)(nodeName.innerHTML, nodeValue.innerHTML, nodeName);
      }
    });
    nodeValue.addEventListener("keydown",(evt) => {
      if (evt.keyCode === 13 || evt.keyCode === 9) { // Enter or tab
        evt.preventDefault();
        sendTextToClient.bind(this)(nodeName.innerHTML, nodeValue.innerHTML, nodeValue);
      }
    });
    nodeValue.addEventListener("mousemove",(e) => {
      this.uriCheck("mousemove", nodeValue, e);
    });
    nodeValue.addEventListener("mouseout",(e) => {
      $(nodeValue).removeClass("link-hovered");
    });
  }

  uriCheck(triggerType: string, node, e) {
    if (e != null && e.ctrlKey) {
      var urlPattern = /(\w+):\/*([^\/]+)([a-z0-9\-@\^=%&;\/~\+]*)[\?]?([^ \#]*)#?([^ \#]*)/i;
      if (urlPattern.test(node.innerText)) {
        switch(triggerType){
          case "click": open(node.innerText);
          case "mousemove": $(node).addClass("link-hovered");
          default: return true;
        }
      }
    }
    else{
      $(node).removeClass("link-hovered");
    }
    return false;
  }

  render() {
    var node = new FluentDOM("SPAN", "nodeAttribute", this.parent.headerAttributes);
    this.element = node.element;
    var nodename = node.createChild("SPAN", "attr-name").html(this.name);
    node.element.id = VORLON.Tools.CreateGUID();
    node.createChild("SPAN").html("=\"");
    var nodevalue = node.createChild("SPAN", "attr-value").html(this.value);
    node.createChild("SPAN").html("\"");
    this.eventNode(nodename.element, nodevalue.element, node.element.id);
  }
}
