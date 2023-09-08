package com.data.statistics.visualization.controller;
import com.data.statistics.visualization.model.Data;
import com.data.statistics.visualization.requestresponse.ApiRequest;
import com.data.statistics.visualization.requestresponse.ApiResponse;
import com.data.statistics.visualization.service.DataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class DataController {

    @Autowired
    DataService dataService;

    @PostMapping("/loadData")
    public void loadData() {
        dataService.loadData();
    }

    @GetMapping("/getData")
    public List<Data> getData() {
        return dataService.getData();
    }

    @PostMapping("/getData/search")
    public ApiResponse filterData(@RequestBody ApiRequest request) {
        return dataService.filterData(request);
    }
}