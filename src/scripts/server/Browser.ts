import { evaluate, evaluateAsync } from "./FunctionEvaluator";
import { writeFileSync } from "fs";

declare const html2canvas: Html2CanvasStatic;

export async function findElement(selector: string) {
  return evaluate(selector => {
    return document.querySelector(selector);
  }, selector);
}

export class Browser {
  async captureScreenShot(filePath: string) {
    const png = await evaluateAsync(result => {
      html2canvas(document.body)
      .then(canvas => {
        result(canvas.toDataURL());
      })
      .catch(e => {
        result("ERROR");
      });
    });
    writeFileSync(filePath, new Buffer((png as string).replace("data:image/png;base64,", ""), "base64"));
  }

  async getUrl(path: string) {
    return evaluate((path: string) => {
      location.assign(path);
    }, path);
  }

  async reload(forceReload?: boolean) {
    return evaluate((forceReload?: boolean) => {
      location.reload(forceReload);
    }, forceReload);
  }
}

export const browser =  new Browser();
