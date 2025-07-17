import type { App } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTrash , faPlus} from "@fortawesome/free-solid-svg-icons";
import { faCheckSquare} from '@fortawesome/free-solid-svg-icons';
import { faSquare } from "@fortawesome/free-regular-svg-icons";
library.add(faTrash,faPlus,faSquare,faCheckSquare);

export default (app: App) => {
  app.component("font-awesome-icon", FontAwesomeIcon);
};
