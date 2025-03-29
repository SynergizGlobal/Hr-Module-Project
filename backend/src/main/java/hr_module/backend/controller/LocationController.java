package hr_module.backend.controller;

import hr_module.backend.model.primary.Location;
import hr_module.backend.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/location")
@CrossOrigin
public class LocationController {
    @Autowired
    private LocationService locationService;

    @GetMapping("/getAll")
    public List<Location> getAllLocations() {
        return locationService.getAllLocations();
    }

    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody Location location) {
        try {
            locationService.saveLocation(location);
            return ResponseEntity.ok("New location added!");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }
}
