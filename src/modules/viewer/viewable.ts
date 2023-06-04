import { Template } from "./entity/template";
import { ModelView } from "./model-view";

export interface Viewable {
    getModelView(): { template: Template, model: ModelView };
}