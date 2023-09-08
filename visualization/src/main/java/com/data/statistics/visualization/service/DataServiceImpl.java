package com.data.statistics.visualization.service;

import com.data.statistics.visualization.model.Data;
import com.data.statistics.visualization.repository.DataRepository;
import com.data.statistics.visualization.requestresponse.ApiRequest;
import com.data.statistics.visualization.requestresponse.ApiResponse;
import com.data.statistics.visualization.requestresponse.FilterData;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Slf4j
@Service
public class DataServiceImpl implements DataService {

    @Autowired
    DataRepository dataRepository;

    private final EntityManager entityManager;


    public DataServiceImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }


    @Override
    public void loadData() {
        List<Data> record = new ArrayList<Data>();
        try {
            BufferedReader br = new BufferedReader(new InputStreamReader(Objects.requireNonNull(getClass().getResourceAsStream("/Data.csv"))));
            String line = br.readLine();// to read the header
            while ((line = br.readLine()) != null) {
                String[] fields = line.split(",(?=([^\"]*\"[^\"]*\")*[^\"]*$)");
                if (fields.length != 0) {
                    Data data = new Data();
                    if (!fields[0].equals("")) {
                        data.setEndYear(Integer.parseInt(fields[0]));
                    }
                    data.setCitylng(fields[1]);
                    data.setCitylat(fields[2]);
                    if (!fields[3].equals("")) {
                        data.setIntensity(Integer.parseInt(fields[3]));
                    }
                    data.setSector(fields[4]);
                    data.setTopic(fields[5]);
                    data.setInsight(fields[6]);
                    data.setSwot(fields[7]);
                    data.setUrl(fields[8]);
                    data.setRegion(fields[9]);
                    if (!fields[10].equals("")) {
                        data.setStartYear(Integer.parseInt(fields[10]));
                    }
                    if (!fields[11].equals("")) {
                        data.setImpact(Integer.parseInt(fields[11]));
                    }
                    data.setAdded(LocalDateTime.parse(fields[12].replaceAll("\"", ""), DateTimeFormatter.ofPattern("MMMM, dd yyyy HH:mm:ss")));
                    data.setPublished(LocalDateTime.parse(fields[13].replaceAll("\"", ""), DateTimeFormatter.ofPattern("MMMM, dd yyyy HH:mm:ss")));
                    data.setCity(fields[14]);
                    data.setCountry(fields[15]);
                    if (!fields[16].equals("")) {
                        data.setRelevance(Integer.parseInt(fields[16]));
                    }
                    data.setPestle(fields[17]);
                    data.setSource(fields[18]);
                    if (fields[19].length() >= 255)
                        System.out.println(fields[19].length());
                    data.setTitle(fields[19]);
                    if (!fields[20].equals("")) {
                        data.setLikelihood(Integer.parseInt(fields[20]));
                    }
                    record.add(data);
                }
            }
        } catch (Exception e) {
            log.error(e.getMessage());
        }
        dataRepository.saveAll(record);

    }


    public ApiResponse filterData(ApiRequest request) {

        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Data> criteriaQuery = criteriaBuilder.createQuery(Data.class);
        Root<Data> root = criteriaQuery.from(Data.class);
        int pageNumber = request.getPageNumber();
        int pageSize = request.getPageSize();
        FilterData filterData = request.getFilterData();


        List<Predicate> fieldPredicates = new ArrayList<>();

        if (!filterData.getTopic().isEmpty()) {
            Predicate topicPredicate = criteriaBuilder.equal(root.get("topic"), filterData.getTopic());
            fieldPredicates.add(topicPredicate);
        }
        if (filterData.getEndYear() != null) {
            Predicate topicPredicate = criteriaBuilder.equal(root.get("endYear"), filterData.getEndYear());
            fieldPredicates.add(topicPredicate);
        }
        if (!filterData.getSector().isEmpty()) {
            Predicate topicPredicate = criteriaBuilder.equal(root.get("sector"), filterData.getSector());
            fieldPredicates.add(topicPredicate);
        }
        if (!filterData.getRegion().isEmpty()) {
            Predicate topicPredicate = criteriaBuilder.equal(root.get("region"), filterData.getRegion());
            fieldPredicates.add(topicPredicate);
        }
        if (!filterData.getPestle().isEmpty()) {
            Predicate topicPredicate = criteriaBuilder.equal(root.get("pestle"), filterData.getPestle());
            fieldPredicates.add(topicPredicate);
        }
        if (!filterData.getSource().isEmpty()) {
            Predicate topicPredicate = criteriaBuilder.equal(root.get("source"), filterData.getSource());
            fieldPredicates.add(topicPredicate);
        }
        if (!filterData.getCountry().isEmpty()) {
            Predicate topicPredicate = criteriaBuilder.equal(root.get("country"), filterData.getCountry());
            fieldPredicates.add(topicPredicate);
        }
        if (!filterData.getCity().isEmpty()) {
            Predicate topicPredicate = criteriaBuilder.equal(root.get("city"), filterData.getCity());
            fieldPredicates.add(topicPredicate);
        }


        Predicate finalPredicate = criteriaBuilder.and(fieldPredicates.toArray(new Predicate[0]));

        criteriaQuery.where(finalPredicate);

        int startPosition = (pageNumber - 1) * pageSize;
        List<Data> result = entityManager.createQuery(criteriaQuery)
                .setFirstResult(startPosition)
                .setMaxResults(pageSize)
                .getResultList();

        long totalRowCount = countResult(finalPredicate);
        System.out.println(totalRowCount);


        return new ApiResponse(totalRowCount, result);

    }


    public List<Data> getData() {
        return dataRepository.findAll();
    }

    public Long countResult(Predicate finalPredicate) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();

        CriteriaQuery<Long> countQuery = criteriaBuilder.createQuery(Long.class);
        Root<Data> countRoot = countQuery.from(Data.class);
        countQuery.select(criteriaBuilder.count(countRoot)).where(finalPredicate);

        List<Long> resultList = entityManager.createQuery(countQuery).getResultList();

        return resultList.isEmpty() ? 0L : resultList.get(0);
    }
}