package edu.infosys.lostFoundLocatorApplication.dao;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.infosys.lostFoundLocatorApplication.bean.MatchItem;

@Repository
public class MatchItemDaoImpl implements MatchItemDao {

    @Autowired
    private MatchItemRepository repository;

    @Override
    public void saveMatchItem(MatchItem matchItem) {

        repository.save(matchItem);

    }
    @Override
    public List<MatchItem> getAllMatches() {
        return repository.findAll();
    }
}