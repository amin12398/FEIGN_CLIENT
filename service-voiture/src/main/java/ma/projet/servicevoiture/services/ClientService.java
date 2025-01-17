package ma.projet.servicevoiture.services;

import ma.projet.servicevoiture.entities.Client;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(name="SERVICE-CLIENT")
public interface ClientService {
    @GetMapping(path="/client/{id}")
    public Client clientById(@PathVariable Long id);
}
