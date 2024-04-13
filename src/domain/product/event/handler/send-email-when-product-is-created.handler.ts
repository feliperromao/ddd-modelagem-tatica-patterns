import EventInterface from "../../../../domain/@shared/event/event.interface";
import EventHandlerInterface from "../../../../domain/@shared/event/event-handler.interface";
import ProductCreatedEvent from "../product-created.event";

export default class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface<ProductCreatedEvent> {
  handle(event: EventInterface): void {
    console.log("🚀 [event]: sending email to", event.data?.email)
  }
}