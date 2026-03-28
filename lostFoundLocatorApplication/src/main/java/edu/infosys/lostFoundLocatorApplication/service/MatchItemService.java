package edu.infosys.lostFoundLocatorApplication.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.infosys.lostFoundLocatorApplication.bean.*;
import edu.infosys.lostFoundLocatorApplication.dao.*;

@Service
public class MatchItemService {

    @Autowired
    private MatchItemRepository matchRepository;

    @Autowired
    private LostItemRepository lostRepository;

    @Autowired
    private FoundItemRepository foundRepository;

    // ✅ GET ALL MATCHES (FIXED ITEM NAME)
    public List<MatchItemDTO> getAllMatches() {

        List<MatchItem> matches = matchRepository.findAll();
        List<MatchItemDTO> dtoList = new ArrayList<>();

        for (MatchItem match : matches) {

            MatchItemDTO dto = new MatchItemDTO();

            String lostId = match.getMatchItemId().getLostItemId();
            String foundId = match.getMatchItemId().getFoundItemId();

            dto.setLostItemId(lostId);
            dto.setFoundItemId(foundId);
            dto.setCategory(match.getCategory());
            dto.setLostUsername(match.getLostUsername());
            dto.setFoundUsername(match.getFoundUsername());

            // 🔥 FIX: FETCH ITEM NAME FROM LOST TABLE
            LostItem lost = lostRepository.findById(lostId).orElse(null);

            if (lost != null) {
                dto.setItemName(lost.getLostItemName());
            } else {
                dto.setItemName("N/A");
            }

            dtoList.add(dto);
        }

        return dtoList;
    }

    // ✅ SAVE MATCH
    public void saveMatch(MatchItemDTO dto) {

        MatchItem match = new MatchItem();

        match.setMatchItemId(
            new MatchItemId(dto.getLostItemId(), dto.getFoundItemId())
        );

        match.setCategory(dto.getCategory());
        match.setLostUsername(dto.getLostUsername());
        match.setFoundUsername(dto.getFoundUsername());

        matchRepository.save(match);
    }

    // ✅ UPDATE STATUS
    public void updateLostFoundItems(MatchItemDTO dto) {

        lostRepository.findById(dto.getLostItemId()).ifPresent(lost -> {
            lost.setStatus(true);
            lostRepository.save(lost);
        });

        foundRepository.findById(dto.getFoundItemId()).ifPresent(found -> {
            found.setStatus(true);
            foundRepository.save(found);
        });
    }

    // ✅ MATCH SEARCH
    public List<FoundItem> matchItemSearch(String lostItemId) {

        LostItem lostItem = lostRepository.findById(lostItemId)
                .orElseThrow(() -> new RuntimeException("Lost item not found"));

        List<FoundItem> allFoundItems = foundRepository.findAll();
        List<FoundItem> matchedItems = new ArrayList<>();

        for (FoundItem found : allFoundItems) {

            double brandScore = similarity(lostItem.getBrand(), found.getBrand());
            double colorScore = similarity(lostItem.getColor(), found.getColor());
            double categoryScore = similarity(lostItem.getCategory(), found.getCategory());
            double nameScore = similarity(lostItem.getLostItemName(), found.getFoundItemName());

            double totalScore =
                    (0.3 * nameScore) +
                    (0.3 * categoryScore) +
                    (0.2 * brandScore) +
                    (0.2 * colorScore);

            if (totalScore >= 0.6) {
                matchedItems.add(found);
            }
        }

        return matchedItems;
    }

    // 🔹 SIMILARITY METHODS
    private double similarity(String s1, String s2) {
        if (s1 == null || s2 == null) return 0;

        int distance = levenshteinDistance(s1.toLowerCase(), s2.toLowerCase());
        int maxLength = Math.max(s1.length(), s2.length());

        return maxLength == 0 ? 1.0 : 1.0 - ((double) distance / maxLength);
    }

    private int levenshteinDistance(String s1, String s2) {

        int[][] dp = new int[s1.length() + 1][s2.length() + 1];

        for (int i = 0; i <= s1.length(); i++) {
            for (int j = 0; j <= s2.length(); j++) {

                if (i == 0) dp[i][j] = j;
                else if (j == 0) dp[i][j] = i;
                else {
                    int cost = (s1.charAt(i - 1) == s2.charAt(j - 1)) ? 0 : 1;
                    dp[i][j] = Math.min(
                            Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1),
                            dp[i - 1][j - 1] + cost
                    );
                }
            }
        }

        return dp[s1.length()][s2.length()];
    }
}