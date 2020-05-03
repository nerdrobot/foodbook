import {Menu} from "~/app/models/menu";
import {Order} from "~/app/models/order";

export class Restaurant {
    id;
    name;
    managerEmail: string;
    menu: Menu[];
    address: string;
    phone: string;
    orders: Order[];
}
