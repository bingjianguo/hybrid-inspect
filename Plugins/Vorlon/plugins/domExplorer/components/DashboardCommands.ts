export default {
  init(root: PackagedNode) {
    var plugin = <DOMExplorerDashboard>this;
    plugin.initDashboard(root);
  },
  contentChanged() {

  },
  searchDOMByResults(data: any) {
    var plugin = <DOMExplorerDashboard>this;
    plugin.searchDOMByResults(data);

  },
  mutationObeserverAvailability(data: any) {
    var plugin = <DOMExplorerDashboard>this;
    plugin.mutationObeserverAvailability(data);
  },
  innerHTML(data: any) {
    var plugin = <DOMExplorerDashboard>this;
    plugin.setInnerHTMLView(data);
  },
  setLayoutStyle(data: any) {
    var plugin = <DOMExplorerDashboard>this;
    plugin.setLayoutStyle(data);
  },
  setComputedStyle(data: any) {
    var plugin = <DOMExplorerDashboard>this;
    plugin.setComputedStyle(data);
  },
  refreshNode(node: PackagedNode) {
    var plugin = <DOMExplorerDashboard>this;
    plugin.updateDashboard(node);
  },
  nodeStyle(data: any){
    console.log("dashboard receive node style", data);
    var plugin = <DOMExplorerDashboard>this;
    plugin.setNodeStyle(data.internalID, data.styles);
  }
}

