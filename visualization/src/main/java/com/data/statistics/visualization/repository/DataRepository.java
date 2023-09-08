package com.data.statistics.visualization.repository;
import com.data.statistics.visualization.model.Data;
import com.data.statistics.visualization.requestresponse.FilterData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DataRepository extends JpaRepository<Data, Integer> {

}