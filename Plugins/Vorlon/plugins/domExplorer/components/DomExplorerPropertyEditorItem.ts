export default class DomExplorerPropertyEditorItem {
  private parent: DomExplorerPropertyEditor;
  private name: string;
  private value: string;
  constructor(parent: DomExplorerPropertyEditor, name: string, value: string, internalId: string, editableLabel: boolean = false, generate: boolean = true) {
    this.parent = parent;
    this.name = name;
    this.value = value;
    if (generate)
      this._generateStyle(name, value, internalId, editableLabel);
  }
  private _generateStyle(property: string, value: string, internalId: string, editableLabel = false): void {
    console.debug(property + value);
    var wrap = document.createElement("div");
    wrap.className = 'styleWrap';
    var label = document.createElement("div");
    label.innerHTML = property;
    label.className = "styleLabel";
    label.contentEditable = "false";
    var valueElement = this._generateClickableValue(label, value, internalId);
    wrap.appendChild(label);
    if(property.indexOf("color") != -1){
      var square = document.createElement("span");
      square.className = "colored-square";
      square.style.backgroundColor = value;
      wrap.appendChild(square);
    }
    wrap.appendChild(valueElement);
    this.parent.plugin.styleView.appendChild(wrap);

    if (editableLabel) {
      label.addEventListener("blur",() => {
        this.parent.plugin.undoEditable(label);
      });

      label.addEventListener("click",() => {
        this.parent.plugin.makeEditable(label);
      });

      label.addEventListener("keydown",(evt) => {
        if (evt.keyCode === 13 || evt.keyCode === 9) { // Enter or tab
          this.parent.plugin.makeEditable(valueElement);
          evt.preventDefault();
        }
      });
    }
  }

  private _generateClickableValue(label: HTMLElement, value: string, internalId: string): HTMLElement {
    // Value
    var valueElement = document.createElement("div");
    valueElement.contentEditable = "false";
    valueElement.innerHTML = value || "&nbsp;";
    valueElement.className = "styleValue";
    valueElement.addEventListener("keydown",(evt) => {
      if (evt.keyCode === 13 || evt.keyCode === 9) { // Enter or tab
        //Create the properties object of elements.
        var propertyObject: any = {};
        propertyObject.property = label.innerHTML.trim();
        propertyObject.newValue = valueElement.innerHTML;
        var propsArr = this.parent.styles;
        //check if property exists in array
        var found = false;
        for (var index = 0; index < this.parent.styles.length; index++) {
          var propObj = this.parent.styles[index];
          if (propObj.name === propertyObject.property) {
            this.parent.styles[index].value = propertyObject.newValue;
            found = true;
            break;
          }
        }
        if (!found) {
          this.parent.styles.push(new DomExplorerPropertyEditorItem(this.parent, propertyObject.property, propertyObject.newValue, internalId, false, false));
        }
        this.parent.node.styles = [];
        for (var index = 0; index < this.parent.styles.length; index++) {
          this.parent.node.styles.push(this.parent.styles[index].name + ":" + this.parent.styles[index].value);
        }
        this.parent.plugin.sendCommandToClient('style', {
          property: label.innerHTML,
          newValue: valueElement.innerHTML,
          order: internalId
        });
        evt.preventDefault();
        this.parent.plugin.undoEditable(valueElement);
      }
    });

    valueElement.addEventListener("blur",() => {
      this.parent.plugin.undoEditable(valueElement);
    });
    valueElement.addEventListener("click",() => {
      this.parent.plugin.makeEditable(valueElement);
    });
    return valueElement;
  }
}
