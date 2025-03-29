package hr_module.backend.service;

import hr_module.backend.model.primary.Location;

import java.util.List;

public interface LocationService {
    public Location saveLocation(Location location);

    public List<Location> getAllLocations();

    public Location getOrCreateLocation (String name);
}
