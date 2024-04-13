import EventInterface from "../../@shared/event/event.interface"

export default class ProductCreatedEvent implements EventInterface {
  created_at: Date;
  data: any;

  constructor(data: any) {
    this.created_at = new Date();
    this.data = data;
  }
}