package com.example.sample.service;

import com.example.sample.domain.Employee;
import com.example.sample.domain.enums.Department;
import com.example.sample.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
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
        Employee e1 = new Employee();
        e1.setName("Aung Aung");
        e1.setAddress("Hlaing Township, Yangon");
        e1.setPhone("+95943884332");
        e1.setDepartment(Department.SOFTWARE);

        Employee e2 = new Employee();
        e2.setName("Thuzar");
        e2.setAddress("Baham Township, Yangon");
        e2.setPhone("+95943884332");
        e2.setDepartment(Department.SALE);

        this.employeeRepository.saveAll(List.of(e1, e2));
    }
}
