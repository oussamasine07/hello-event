package com.helloevent.backend.controller;

import com.helloevent.backend.dto.EventDTO;
import com.helloevent.backend.model.Event;
import com.helloevent.backend.service.EventService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/events")
@CrossOrigin
public class EventController {

    private final EventService eventService;

    public EventController (
            final EventService eventService
    ) {
        this.eventService = eventService;
    }

    @GetMapping
    public List<Event> index () {
        return eventService.listAllEvents();
    }

    @GetMapping("/{id}")
    public Optional<Event> show (@PathVariable Long id) {
        return eventService.showEvent(id);
    }

    @PostMapping
    public Event create (@RequestBody EventDTO event, @RequestHeader("Authorization") String token) {
        return eventService.createNewEvent(event, token);
    }

    @PutMapping("/{id}")
    public Event update (@RequestBody EventDTO event, @RequestHeader("Authorization") String token, @PathVariable Long id) {
        return eventService.updateEvent(event, token, id);
    }

    @DeleteMapping("/{id}")
    public void delete (@RequestHeader("Authorization") String token, @PathVariable Long id) {
        eventService.deleteEvent(token, id);
    }


}
