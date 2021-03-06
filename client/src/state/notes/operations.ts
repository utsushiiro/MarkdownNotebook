import { Dispatch } from "redux";
import { apiGet, apiPost, apiPatch, apiDelete } from "@api";
import { normalize } from "normalizr";
import { noteSchema, notesObjectSchema } from "./schema";
import { eventTypes } from "@state/events/constants";
import { eventsACs } from "@state/events";
import { notesACs } from ".";
import { usersACs } from "@state/users";

function createNote(title: string, content: string) {
  return async (dispatch: Dispatch) => {
    let createdNoteId: string | undefined = undefined;
    try {
      dispatch(notesACs.startLoading());

      const response = await apiPost("/api/v1/notes", {
        body: {
          title,
          content
        }
      });
      const normalizedData = normalize(response.data, noteSchema);
      createdNoteId = response.data.id;

      dispatch(notesACs.upsertEntities(normalizedData.entities.notes));
      dispatch(usersACs.upsertEntities(normalizedData.entities.users));
      dispatch(notesACs.finishLoading());
      dispatch(eventsACs.createEntity(eventTypes.CREATED_NOTE));
    } catch (err) {
      dispatch(notesACs.finishLoading());
      dispatch(eventsACs.createEntity(eventTypes.FAILED_TO_CREATE_NOTE));
    }

    return createdNoteId;
  };
}

function fetchNotes() {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(notesACs.startLoading());

      const response = await apiGet("/api/v1/notes");
      const normalizedData = normalize(response.data, notesObjectSchema);

      dispatch(notesACs.upsertEntities(normalizedData.entities.notes));
      dispatch(usersACs.upsertEntities(normalizedData.entities.users));
      dispatch(notesACs.finishLoading());
    } catch (err) {
      dispatch(notesACs.finishLoading());
    }
  };
}

function fetchNote(id: string) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(notesACs.startLoading());

      const response = await apiGet("/api/v1/notes/:id", {
        vars: { id: id }
      });
      const normalizedData = normalize(response.data, noteSchema);

      dispatch(notesACs.upsertEntities(normalizedData.entities.notes));
      dispatch(usersACs.upsertEntities(normalizedData.entities.users));
      dispatch(notesACs.finishLoading());
    } catch (err) {
      dispatch(notesACs.finishLoading());
    }
  };
}

function updateNote(
  id: string,
  title: string,
  content: string,
  version: string
) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(notesACs.startLoading());

      const response = await apiPatch("/api/v1/notes/:id", {
        vars: { id: id },
        body: {
          title,
          content,
          version
        }
      });
      const normalizedData = normalize(response.data, noteSchema);

      dispatch(notesACs.upsertEntities(normalizedData.entities.notes));
      dispatch(usersACs.upsertEntities(normalizedData.entities.users));
      dispatch(notesACs.finishLoading());
      dispatch(eventsACs.createEntity(eventTypes.UPDATED_NOTE));
    } catch (err) {
      dispatch(notesACs.finishLoading());
      dispatch(eventsACs.createEntity(eventTypes.FAILED_TO_UPDATE_NOTE));
    }
  };
}

function deleteNote(id: string) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(notesACs.startLoading());

      await apiDelete("/api/v1/notes/:id", {
        vars: { id: id }
      });

      dispatch(notesACs.deleteEntity(id));
      dispatch(notesACs.finishLoading());
      dispatch(eventsACs.createEntity(eventTypes.DELETED_NOTE));
    } catch (err) {
      dispatch(notesACs.finishLoading());
      dispatch(eventsACs.createEntity(eventTypes.FAILED_TO_DELETE_NOTE));
    }
  };
}

export default {
  createNote,
  fetchNotes,
  fetchNote,
  updateNote,
  deleteNote
};
