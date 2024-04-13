import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface {
  private handlers: {
    [eventName: string]: EventHandlerInterface[]
  } = {};

  get getEventHandlers(): {[eventName: string]: EventHandlerInterface[]} {
    return this.handlers;
  }
  
  notify(event: EventInterface): void {
    const eventName = event.constructor.name
    if (this.handlers[eventName]) {
      this.handlers[eventName].forEach(eventHandler => {
        eventHandler.handle(event)
      })
    }
  }

  register(eventName: string, handler: EventHandlerInterface<EventInterface>): void {
    if( !this.handlers[eventName] ) {
      this.handlers[eventName] = [];
    }

    this.handlers[eventName].push(handler)
  }

  unregister(eventName: string, handler: EventHandlerInterface<EventInterface>): void {
    if( this.handlers[eventName] ) {
      const index = this.handlers[eventName].indexOf(handler)
      if (index !== -1) {
        this.handlers[eventName].splice(index, 1)
      }
    }
  }

  unregisterAll(): void {
    this.handlers = {}
  }
}