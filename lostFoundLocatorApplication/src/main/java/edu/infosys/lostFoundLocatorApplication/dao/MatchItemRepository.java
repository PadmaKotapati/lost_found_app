package edu.infosys.lostFoundLocatorApplication.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.infosys.lostFoundLocatorApplication.bean.MatchItem;
import edu.infosys.lostFoundLocatorApplication.bean.MatchItemId;

@Repository
public interface MatchItemRepository extends JpaRepository<MatchItem, MatchItemId> {
    
    List<MatchItem> findByLostUsername(String lostUsername);
    List<MatchItem> findByFoundUsername(String foundUsername);
  
    List<MatchItem> findByCategory(String category);

}