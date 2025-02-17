import { TOOLTIP_CSS_CONST } from "@antv/component";
import { deepMix } from "@antv/util";
import { HtmlTooltip } from "../../../../dependents";
import Action from "../../base";
import { getDelegationObject } from "../../util";

const AXIS_DESCRIPTION_TOOLTIP = 'aixs-description-tooltip'

class AxisDescription extends Action {
  private tooltip;

  public show() {
    const context = this.context;
    const { axis } = getDelegationObject(context);
    const { description, text } = axis.cfg.title;
    const { x, y } = context.event;
    if(!this.tooltip) {
      this.renderTooltip()
    };
    this.tooltip.update({
      title: text || '',
      customContent: () => {
        return (`
          <div class="${TOOLTIP_CSS_CONST.CONTAINER_CLASS}">
            <div class="${TOOLTIP_CSS_CONST.TITLE_CLASS}">
              ${text}
            </div>
            <div class="${TOOLTIP_CSS_CONST.LIST_CLASS}">
              ${description}
            </div>
          </div>
        `)
      },
      x,
      y
    });
    this.tooltip.show()
  }

  public destroy() {
    super.destroy();
    this.tooltip && this.tooltip.destroy();
  }

  public hide() {
    this.tooltip && this.tooltip.hide()
  }

  public renderTooltip() {
    const view = this.context.view;
    const canvas = view.canvas;
    const region = {
      start: { x: 0, y: 0 },
      end: { x: canvas.get('width'), y: canvas.get('height') },
    };
    const tooltip = new HtmlTooltip({
      parent: canvas.get('el').parentNode,
      region,
      visible: false,
      containerId: AXIS_DESCRIPTION_TOOLTIP,
      domStyles: {
        ...deepMix({}, {
          // 超长的时候，tooltip tip 最大宽度为 50%，然后可以换行
          [TOOLTIP_CSS_CONST.CONTAINER_CLASS]: {
            'max-width': '50%',
            'padding': '5px',
            'line-height': '15px'
          },
          [TOOLTIP_CSS_CONST.TITLE_CLASS]: {
            'word-break': 'break-all',
            'font-size': '14px',
            'margin-bottom': '3px'
          },
          [TOOLTIP_CSS_CONST.LIST_CLASS]: {
            'word-break': 'break-all',
            'opacity': '.5'
          }
        }),
      },
    });
    tooltip.init();
    tooltip.setCapture(false);
    this.tooltip = tooltip
  }
}
export default AxisDescription
