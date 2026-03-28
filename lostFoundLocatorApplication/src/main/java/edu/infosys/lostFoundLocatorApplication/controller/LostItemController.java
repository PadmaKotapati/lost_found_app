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

import edu.infosys.lostFoundLocatorApplication.bean.LostItem;
import edu.infosys.lostFoundLocatorApplication.dao.LostItemDao;
import edu.infosys.lostFoundLocatorApplication.service.LostItemService;
import edu.infosys.lostFoundLocatorApplication.service.LostfoundUserService;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/lostfound")
public class LostItemController {
	@Autowired
	private LostItemDao lostItemDao;
	
	@Autowired
	private LostfoundUserService service;
	
	@Autowired
	private LostItemService lostService;
	@PostMapping("/lost")
	public void saveLostItem(@RequestBody LostItem lostItem) {

	    if(lostItem.getUsername() == null || lostItem.getUsername().isEmpty()){
	        lostItem.setUsername("student1"); // temporary test
	    }

	    lostItemDao.saveLostItem(lostItem);

	}
	@GetMapping("/lost")
	public List<LostItem> getAllLostItems() {
		// TODO Auto-generated method stub
		return lostItemDao.getAllLostItems();
	}

	@GetMapping("/lost/{lostItemId}")
	public LostItem getLostItemById(@PathVariable String lostItemId) {
		// TODO Auto-generated method stub
		return lostItemDao.getLostItemById(lostItemId);
	}
     
	@PutMapping("/lost")
	public void updateLostItem(@RequestBody LostItem lostItem) {
	    lostItemDao.saveLostItem(lostItem);   
	}
	
	@DeleteMapping("/lost/{lostItemId}")
	public void deleteLostItemById(@PathVariable String lostItemId) {
	    lostItemDao.deleteLostItemById(lostItemId);
	}

	@GetMapping("/lost-id")
	public String generateLostItemId() {
		
		return lostService.generateLostItemId();
	}
	
	@GetMapping("/lost-user/{username}")
	public List<LostItem> getLostItemsByUsername(@PathVariable String username){
	    return lostItemDao.getLostItemsByUsername(username);
	}
	 

}

