package com.data.statistics.visualization.service;

import com.data.statistics.visualization.model.Data;
import com.data.statistics.visualization.requestresponse.ApiRequest;
import com.data.statistics.visualization.requestresponse.ApiResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface DataService {
    void loadData();

    List<Data> getData();

    ApiResponse filterData(ApiRequest request);


}