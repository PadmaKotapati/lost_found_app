package edu.infosys.lostFoundLocatorApplication.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import edu.infosys.lostFoundLocatorApplication.bean.LostfounderUser;

public interface LostfoundUserRepository
        extends JpaRepository<LostfounderUser, String> {
}
