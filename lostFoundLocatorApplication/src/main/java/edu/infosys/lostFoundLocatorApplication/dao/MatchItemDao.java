package edu.infosys.lostFoundLocatorApplication.dao;
import java.util.List;

import edu.infosys.lostFoundLocatorApplication.bean.MatchItem;

public interface MatchItemDao {

    void saveMatchItem(MatchItem matchItem);
    List<MatchItem> getAllMatches();

}