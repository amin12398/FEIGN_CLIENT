package ma.projet.servicevoiture.services;

import ma.projet.servicevoiture.entities.Voiture;
import ma.projet.servicevoiture.repositories.VoitureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VoitureService {

    @Autowired
    private VoitureRepository voitureRepository;


    public List<Voiture> findAll() {
        return voitureRepository.findAll();
    }


    public Optional<Voiture> findById(Long id) {
        return voitureRepository.findById(id);
    }


    public List<Voiture> findByClientId(Long idclient) {
        return voitureRepository.findByIdclient(idclient);
    }


    public Voiture enregistrerVoiture(Voiture voiture) {
        return voitureRepository.save(voiture);
    }


    public Voiture updateVoiture(Long id, Voiture updatedVoiture) throws Exception {
        Voiture existingVoiture = voitureRepository.findById(id)
                .orElseThrow(() -> new Exception("Voiture not found with ID: " + id));

        if (updatedVoiture.getMatricule() != null && !updatedVoiture.getMatricule().isEmpty()) {
            existingVoiture.setMatricule(updatedVoiture.getMatricule());
        }
        if (updatedVoiture.getMarque() != null && !updatedVoiture.getMarque().isEmpty()) {
            existingVoiture.setMarque(updatedVoiture.getMarque());
        }
        if (updatedVoiture.getModel() != null && !updatedVoiture.getModel().isEmpty()) {
            existingVoiture.setModel(updatedVoiture.getModel());
        }

        return voitureRepository.save(existingVoiture);
    }


}
