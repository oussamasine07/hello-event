package com.helloevent.backend.service;

import com.helloevent.backend.dto.EventDTO;
import com.helloevent.backend.model.Category;
import com.helloevent.backend.model.Event;
import com.helloevent.backend.model.Role;
import com.helloevent.backend.model.User;
import com.helloevent.backend.repository.EventRepository;
import com.helloevent.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    private final JwtService jwtService;
    private final CategoryService categoryService;


    public EventService (
            final EventRepository eventRepository,
            final UserRepository userRepository,

            final CategoryService categoryService,
            final JwtService jwtService, CategoryService categoryService1
    ) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.categoryService = categoryService1;
    }

    public List<Event> listAllEvents () {
        return eventRepository.findAll();
    }

    public Optional<Event> showEvent (Long id) {
        return eventRepository.findById(id);
    }

    public Event createNewEvent (EventDTO event, String token ) {

        // get signin user from token
        String usernameFromToken = jwtService.extarctUsername(token.substring(7));

        // get user
        User user = userRepository.getUserByUsernameOrByEmail(usernameFromToken);

        Category category = categoryService.getCategoryById(event.category_id());

        // check user role
        if (user.getRole() == Role.ADMIN) {

            Event newEvent = new Event();

            newEvent.setName(event.name());
            newEvent.setDescription(event.description());
            newEvent.setPlace(event.place());
            newEvent.setNumberOfPlaces(event.numberOfPlaces());
            newEvent.setEventDate(event.eventDate());
            newEvent.setUser(user);
            newEvent.setStatus(event.status());
            newEvent.setCategory(category);

            return eventRepository.save(newEvent);

        } else {
            System.out.println("unauthoriezed action");
            throw new Error("unauthoriezed action");
        }
    }

    public Event updateEvent (EventDTO event, String token, Long id) {
        // get signin user from token
        String usernameFromToken = jwtService.extarctUsername(token.substring(7));

        // get user
        User user = userRepository.getUserByUsernameOrByEmail(usernameFromToken);

        // todo add category

        // check user role
        if (user.getRole() == Role.ADMIN) {

            Event newEvent = eventRepository.findById(id).orElseThrow();

            newEvent.setName(event.name());
            newEvent.setDescription(event.description());
            newEvent.setPlace(event.place());
            newEvent.setNumberOfPlaces(event.numberOfPlaces());
            newEvent.setEventDate(event.eventDate());
            newEvent.setUser(user);
            newEvent.setStatus(event.status());

            return eventRepository.save(newEvent);

        } else {
            System.out.println("unauthoriezed action");
            throw new Error("unauthoriezed action");
        }
    }

    public void deleteEvent ( String token, Long id ) {
        // get signin user from token
        String usernameFromToken = jwtService.extarctUsername(token.substring(7));

        // get user
        User user = userRepository.getUserByUsernameOrByEmail(usernameFromToken);

        // check user role
        if (user.getRole() == Role.ADMIN) {

            eventRepository.deleteById(id);

        } else {
            System.out.println("unauthoriezed action");
            throw new Error("unauthoriezed action");
        }
    }

    public void decrementNumberOfPlaces (Long id) {

        Event event = eventRepository.findById(id).orElseThrow();
        event.setNumberOfPlaces(event.getNumberOfPlaces() - 1 );

        eventRepository.save(event);

    }

}
















