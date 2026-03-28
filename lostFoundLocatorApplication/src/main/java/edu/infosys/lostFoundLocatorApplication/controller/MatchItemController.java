package edu.infosys.lostFoundLocatorApplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import edu.infosys.lostFoundLocatorApplication.bean.*;
import edu.infosys.lostFoundLocatorApplication.service.MatchItemService;

@RestController
@RequestMapping("/lostfound")
@CrossOrigin(origins = "http://localhost:3000")
public class MatchItemController {

    @Autowired
    private MatchItemService service;

    // ✅ SEARCH MATCH
    @GetMapping("/match/{lostItemId}")
    public List<FoundItem> findMatches(@PathVariable String lostItemId) {
        return service.matchItemSearch(lostItemId);
    }

    // ✅ SAVE MATCH
    @PostMapping("/match")
    public String saveMatchItem(@RequestBody MatchItemDTO dto) {

        service.updateLostFoundItems(dto);
        service.saveMatch(dto);

        return "Match Item Saved Successfully";
    }

    // ✅ GET REPORT (FIXED)
    @GetMapping("/match/report")
    public List<MatchItemDTO> getAllMatches() {
        return service.getAllMatches();
    }
}