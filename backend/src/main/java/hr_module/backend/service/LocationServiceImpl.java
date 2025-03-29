package hr_module.backend.service;

import hr_module.backend.model.primary.Location;
import hr_module.backend.repository.primary.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LocationServiceImpl implements LocationService {

    @Autowired
    private LocationRepository locationRepository;

    @Override
    public Location saveLocation(Location location) {
        Optional<Location> existingLocation = locationRepository.findByName(location.getName());
        if (existingLocation.isPresent()) {
            throw new RuntimeException("Location with name '" + location.getName() + "' already exists.");
        }
        return locationRepository.save(location);
    }

    @Override
    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }

    @Override
    public Location getOrCreateLocation(String name) {
        return locationRepository.findByName(name)
                .orElseGet(() -> locationRepository.save(new Location(name)));
    }
}
