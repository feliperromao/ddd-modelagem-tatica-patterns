import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler"
import EventDispatcher from "./event-dispatcher"
import ProductCreatedEvent from "../../../domain/product/event/product-created.event"

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const dispatcher = new EventDispatcher()
    const handler = new SendEmailWhenProductIsCreatedHandler()
    dispatcher.register("ProductCreatedEvent", handler)
    expect(
      dispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();

    expect(
      dispatcher.getEventHandlers["ProductCreatedEvent"].length
    ).toBe(1)

    expect(
      dispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(handler)
  })

  it("should unregister an event handler", () => {
    const dispatcher = new EventDispatcher()
    const handler = new SendEmailWhenProductIsCreatedHandler()
    dispatcher.register("ProductCreatedEvent", handler)

    expect(
      dispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(handler)

    dispatcher.unregister("ProductCreatedEvent", handler)
    expect(
      dispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();

    expect(
      dispatcher.getEventHandlers["ProductCreatedEvent"].length
    ).toBe(0)
  })

  it("should unregister ALL event handlers", () => {
    const dispatcher = new EventDispatcher()
    const handler = new SendEmailWhenProductIsCreatedHandler()
    dispatcher.register("ProductCreatedEvent", handler)

    expect(
      dispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(handler)

    dispatcher.unregisterAll()

    expect(
      dispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeUndefined();
  })

  it("should notify all events handler", () => {
    const dispatcher = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()
    dispatcher.register("ProductCreatedEvent", eventHandler)
    const spyEventHandler = jest.spyOn(eventHandler, "handle")

    const event = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 Descrição",
      price: 10.9,
      email: "feliperomaocad@gmail.com"
    });

    dispatcher.notify(event)
    expect(spyEventHandler).toHaveBeenCalled();
  })
})