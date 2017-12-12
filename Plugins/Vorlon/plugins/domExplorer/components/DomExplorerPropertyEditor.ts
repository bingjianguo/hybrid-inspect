import DomExplorerPropertyEditorItem from './DomExplorerPropertyEditorItem';

export default class DomExplorerPropertyEditor {
  //private parent: HTMLElement = null;
  public styles: Array<DomExplorerPropertyEditorItem> = [];
  public node: PackagedNode
  public plugin: DOMExplorerDashboard;
  private internalId: string;
  constructor(plugin: DOMExplorerDashboard) {
    this.plugin = plugin;
  }

  private _generateButton(parentNode: HTMLElement, text: string, className: string, attribute?: any) {
    var button = document.createElement("button");
    button.innerHTML = text;
    button.className = className;
    if (attribute)
      button.setAttribute(attribute.name, attribute.value);
    button.setAttribute('button-block', '');
    return parentNode.appendChild(button);
  }

  public generateStyles(node: PackagedNode, internalId: string, styles?:any): void {
    this.node = node;
    this.internalId = internalId;
    this.styles = [];
    while (this.plugin.styleView.hasChildNodes()) {
      this.plugin.styleView.removeChild(this.plugin.styleView.lastChild);
    }

    if (styles){
      // Current styles
      for (var index = 0; index < styles.length; index++) {
        var style = styles[index];
        var splits = style.split(":");
        // ensure that urls are not malformed after the split.
        if(splits[2] !== undefined && splits[2].indexOf('//') > -1)
          splits[1] += ":" + splits[2];
        this.styles.push(new DomExplorerPropertyEditorItem(this, splits[0], splits[1], this.internalId));
      }
      // Append add style button
      this._generateButton(this.plugin.styleView, "+", "styleButton", null).addEventListener('click',(e) => {
        new DomExplorerPropertyEditorItem(this, "property", "value", this.internalId, true);
        this.plugin.styleView.appendChild(<HTMLElement>e.target);
      });
    }
  }
}