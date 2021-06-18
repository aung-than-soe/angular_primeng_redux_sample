package com.example.sample.service;

import com.example.sample.domain.Employee;
import com.example.sample.domain.enums.Department;
import com.example.sample.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service("employeeService")
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    @Override
    public List<Employee> findALl() {
        return this.employeeRepository.findAll();
    }

    @Override
    public Optional<Employee> findById(int id) {
        return this.employeeRepository.findById(id);
    }

    @Override
    public void deleteById(int id) {
        this.employeeRepository.deleteById(id);
    }

    @Override
    public Employee create(Employee employee) {
        return this.employeeRepository.save(employee);
    }

    @PostConstruct
    public void init() {
        List<Employee> employees = new ArrayList<>(21);
        for (int i = 0; i < 20; i++) {
            Employee e = new Employee();
            String name = i% 2 == 0 ? "Kaung Kaung" : "Maung Maung";
            e.setName(String.format("%s - %d", name, i));
            String address = i % 3 == 0 ? "Hlaing" : i%4 == 0 ? "Baham" : "Tamwe";
            e.setAddress(String.format("%s Township, Yangon", address));
            e.setPhone(String.format("+959442%d8%d21%d", i, i, i));
            e.setDepartment(i%2 == 0 ? Department.SALE : Department.SOFTWARE);
            employees.add(e);
        }
        this.employeeRepository.saveAll(employees);
    }
}
