package jp.utsushiiro.sharenotes.api.controller;

import jp.utsushiiro.sharenotes.api.dto.form.NoteForm;
import jp.utsushiiro.sharenotes.api.domain.User;
import jp.utsushiiro.sharenotes.api.dto.resource.NoteResource;
import jp.utsushiiro.sharenotes.api.dto.resource.NotesResource;
import jp.utsushiiro.sharenotes.api.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class NotesRestController {

    private final NoteService noteService;

    @Autowired
    public NotesRestController(NoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping("/notes")
    public NotesResource findAll() {
        return new NotesResource(noteService.findAll());
    }

    @GetMapping("/notes/{id}")
    public NoteResource find(@PathVariable Long id) {
        return new NoteResource(noteService.findById(id));
    }

    @PostMapping("/notes")
    public NoteResource create(
            @RequestBody @Validated NoteForm noteForm,
            @AuthenticationPrincipal(expression = "user") User user
    ) {
        return new NoteResource(noteService.create(noteForm, user));
    }

    @PatchMapping("/notes/{id}")
    public void update(
            @PathVariable Long id,
            @RequestBody @Validated NoteForm noteForm
    ) {
        noteService.update(id, noteForm);
    }

    @DeleteMapping("/notes/{id}")
    public void delete(@PathVariable Long id) {
        noteService.delete(id);
    }
}
