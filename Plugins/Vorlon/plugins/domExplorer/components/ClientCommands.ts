
export default {
  getMutationObeserverAvailability() {
    var plugin = <DOMExplorerClient>this;
    plugin.getMutationObeserverAvailability();
  },
  style(data: any) {
    var plugin = <DOMExplorerClient>this;
    plugin.setStyle(data.order, data.property, data.newValue);
  },

  searchDOMBySelector(data: any) {
    var plugin = <DOMExplorerClient>this;
    plugin.searchDOMBySelector(data.selector, data.position);
  },

  setSettings(data: any) {
    var plugin = <DOMExplorerClient>this;
    if (data && data.globalload != null)
      plugin.globalload(data.globalload);
  },

  saveinnerHTML(data: any) {
    var plugin = <DOMExplorerClient>this;
    plugin.saveInnerHTML(data.order, data.innerhtml);
  },

  attribute(data: any) {
    var plugin = <DOMExplorerClient>this;
    plugin.setAttribute(data.order, data.attributeName, data.attributeOldName, data.attributeValue);
  },

  setElementValue(data: any) {
    var plugin = <DOMExplorerClient>this;
    plugin.setElementValue(data.order, data.value);
  },

  select(data: any) {
    var plugin = <DOMExplorerClient>this;
    plugin.unhighlightClientElement();
    plugin.setClientHighlightedElement(data.order);
    plugin.getNodeStyle(data.order);
  },

  unselect(data: any) {
    var plugin = <DOMExplorerClient>this;
    plugin.unhighlightClientElement(data.order);
  },

  highlight(data: any) {
    var plugin = <DOMExplorerClient>this;
    plugin.unhighlightClientElement();
    plugin.setClientHighlightedElement(data.order);
  },

  unhighlight(data: any) {
    var plugin = <DOMExplorerClient>this;
    plugin.unhighlightClientElement(data.order);
  },

  refreshNode(data: any) {
    var plugin = <DOMExplorerClient>this;
    plugin.refreshbyId(data.order);
  },

  getNodeStyles(data: any) {
    var plugin = <DOMExplorerClient>this;
    console.log("get node style");
    //plugin.refreshbyId(data.order);
  },

  refresh() {
    var plugin = <DOMExplorerClient>this;
    plugin.refresh();
  },

  inspect() {
    var plugin = <DOMExplorerClient>this;
    plugin.inspect();
  },

  getInnerHTML(data: any) {
    var plugin = <DOMExplorerClient>this;
    plugin.getInnerHTML(data.order);
  },
  getStyle(data: any) {
    var plugin = <DOMExplorerClient>this;
    plugin.getStyle(data.order);
  },
  getComputedStyleById(data: any) {
    var plugin = <DOMExplorerClient>this;
    plugin.getComputedStyleById(data.order);
  }
}