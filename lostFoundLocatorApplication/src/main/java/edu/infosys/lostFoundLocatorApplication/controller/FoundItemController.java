package edu.infosys.lostFoundLocatorApplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.infosys.lostFoundLocatorApplication.bean.FoundItem;
import edu.infosys.lostFoundLocatorApplication.bean.FoundItemDTO;
import edu.infosys.lostFoundLocatorApplication.bean.LostItem;
import edu.infosys.lostFoundLocatorApplication.dao.FoundItemDao;
import edu.infosys.lostFoundLocatorApplication.dao.LostItemDao;
import edu.infosys.lostFoundLocatorApplication.service.FoundItemService;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/lostfound")
public class FoundItemController {

    @Autowired
    private FoundItemDao foundItemDao;
    @Autowired
    private LostItemDao lostItemDao;
     

    @Autowired
    private FoundItemService foundService;
    

    @PostMapping("/found")
    public String saveFoundItem(@RequestBody FoundItemDTO dto) {

        System.out.println("Received DTO: " + dto.getFoundItemName());

        FoundItem item = dto.toEntity();

        foundItemDao.saveFoundItem(item);

        return "Saved Successfully";
    }

    
    @GetMapping("/found")
    public List<FoundItem> getAllFoundItems() {
        return foundItemDao.getAllFoundItems();
    }

    @GetMapping("/found/{foundItemId}")
    public FoundItem getFoundItemById(@PathVariable String foundItemId) {
        return foundItemDao.getFoundItemById(foundItemId);
    }


    @PutMapping("/found")
    public void updateFoundItem(@RequestBody FoundItem foundItem) {
        foundItemDao.saveFoundItem(foundItem);
    }


    @DeleteMapping("/found/{foundItemId}")
    public void deleteFoundItemById(@PathVariable String foundItemId) {
        foundItemDao.deleteFoundItemById(foundItemId);
    }


    @GetMapping("/found-id")
    public String generateFoundItemId() {
        return foundService.generateFoundItemId();
    }

    @GetMapping("/found-user/{username}")
    public List<FoundItem> getFoundItemsByUsername(@PathVariable String username) {
        return foundItemDao.getFoundItemsByUsername(username);
    }
    @GetMapping("/found-id/{id}")
    public List<FoundItemDTO> getFoundItemsByLostItem(@PathVariable String id) {
        LostItem lostItem = lostItemDao.getLostItemById(id);
        return foundService.collectFoundItems(lostItem);
    }

}