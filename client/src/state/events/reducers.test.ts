import reducer, { initialState } from "./reducers";
import { actionTypes } from "./actions";
import { EventsAction, EventsState } from "./types";
import { createTestEventEntity } from "@test-utils";
import { eventTypes } from "./constants";

describe("Event Reducers", () => {
  test("CREATE", () => {
    // setup
    const state: EventsState = {
      ...initialState
    };

    const eventEntity = createTestEventEntity();

    const action: EventsAction = {
      type: actionTypes.CREATE,
      payload: {
        eventEntity: eventEntity
      }
    };

    const expected: EventsState = {
      entities: {
        byId: {
          [eventEntity.id]: eventEntity
        },
        idsByType: {
          [eventEntity.type]: [eventEntity.id]
        }
      }
    };

    // execute
    const result = reducer(state, action);

    // verify
    expect(result).toEqual(expected);
  });

  describe("DELETE", () => {
    test("no event after delete", () => {
      // setup
      const eventEntity = createTestEventEntity();

      const state: EventsState = {
        entities: {
          byId: {
            [eventEntity.id]: eventEntity
          },
          idsByType: {
            [eventEntity.type]: [eventEntity.id]
          }
        }
      };

      const action: EventsAction = {
        type: actionTypes.DELETE,
        payload: {
          eventId: eventEntity.id,
          eventType: eventEntity.type
        }
      };

      const expected: EventsState = {
        entities: {
          byId: {},
          idsByType: {}
        }
      };

      // execute
      const result = reducer(state, action);

      // verify
      expect(result).toEqual(expected);
    });

    test("some event after delete", () => {
      // setup
      const eventType = eventTypes.CREATED_NOTE;
      const eventEntity1 = createTestEventEntity({ type: eventType });
      const eventEntity2 = createTestEventEntity({ type: eventType });

      const state: EventsState = {
        entities: {
          byId: {
            [eventEntity1.id]: eventEntity1,
            [eventEntity2.id]: eventEntity2
          },
          idsByType: {
            [eventType]: [eventEntity1.id, eventEntity2.id]
          }
        }
      };

      const action: EventsAction = {
        type: actionTypes.DELETE,
        payload: {
          eventId: eventEntity1.id,
          eventType: eventEntity1.type
        }
      };

      const expected: EventsState = {
        entities: {
          byId: {
            [eventEntity2.id]: eventEntity2
          },
          idsByType: {
            [eventType]: [eventEntity2.id]
          }
        }
      };

      // execute
      const result = reducer(state, action);

      // verify
      expect(result).toEqual(expected);
    });
  });
});
