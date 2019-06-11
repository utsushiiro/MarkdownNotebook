import * as React from "react";
import { connect } from "react-redux";
import { Note } from "../../state/notes/types";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "../../state/notes/actions";
import { Button } from "reactstrap";
import { push, CallHistoryMethodAction } from "connected-react-router";
import { notesOperations } from "../../state/notes";
import { useEffect } from "react";
import { State } from "../../state/types";

type Props = {
  note: Note;
  onClick: () => void;
  onMount: () => void;
  deleteButtonHandler: () => void;
  isFetching: boolean;
};

const Note: React.FC<Props> = ({
  note,
  onClick,
  onMount,
  deleteButtonHandler,
  isFetching
}) => {
  useEffect(() => {
    onMount();
  }, []);

  return isFetching || note == null ? (
    <div>Loading...</div>
  ) : (
    <div>
      <h2>{note.title}</h2>
      <div>{note.content}</div>
      <Button color="primary" onClick={onClick}>
        Edit
      </Button>
      <Button color="danger" onClick={deleteButtonHandler}>
        Delete
      </Button>
    </div>
  );
};

const mapStateToProps = ({ notesState }: State, ownProps: { id: string }) => {
  return {
    note: notesState.note,
    isFetching: notesState.isFetching
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<State, void, Action | CallHistoryMethodAction>,
  ownProps: { id: string }
) => {
  return {
    onClick() {
      dispatch(push(`/notes/${ownProps.id}/edit`));
    },
    onMount() {
      dispatch(notesOperations.fetchNote(parseInt(ownProps.id)));
    },
    deleteButtonHandler() {
      dispatch(notesOperations.deleteNoteAndRedirect(parseInt(ownProps.id)));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Note);
