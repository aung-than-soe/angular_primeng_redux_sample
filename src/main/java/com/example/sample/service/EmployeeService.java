package com.example.sample.service;

import com.example.sample.domain.Employee;

import java.util.List;
import java.util.Optional;

public interface EmployeeService {

    List<Employee> findALl();
    Optional<Employee> findById(int id);
    void deleteById(int id);
    Employee create(Employee employee);
}
