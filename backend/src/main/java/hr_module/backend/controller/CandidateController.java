package hr_module.backend.controller;

import hr_module.backend.model.primary.Candidate;
import hr_module.backend.model.primary.CandidateStatus;
import hr_module.backend.model.primary.Employee;
import hr_module.backend.model.primary.Job;
import hr_module.backend.service.CandidateService;
import hr_module.backend.service.CandidateStatusService;
import hr_module.backend.service.EmployeeService;
import hr_module.backend.service.JobService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/candidate")
@CrossOrigin
public class CandidateController {
    private static final Logger logger = LoggerFactory.getLogger(CandidateController.class);

    @Autowired
    private CandidateService candidateService;

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private CandidateStatusService candidateStatusService;

    @Autowired
    private JobService jobService;

    @GetMapping("/getAll")
    public List<Candidate> getAllCandidates () {
        return candidateService.getAllCandidates();
    }

    @GetMapping ("/{candidateId}")
    public Candidate getCandidateById (@PathVariable Integer candidateId) {
        return candidateService.getById(candidateId);
    }

    @GetMapping("/getByStatus/{statusId}")
    public List<Candidate> getCandidatesByStatus (@PathVariable Integer statusId) {
        CandidateStatus candidateStatus = candidateStatusService.getById(statusId);
        return candidateService.getCandidatesByStatus(candidateStatus);
    }

    @GetMapping("/getByEmployee/{synergizId}")
    public List<Candidate> getCandidatesByEmployee (@PathVariable String synergizId) {
        Employee employee = employeeService.getEmployeeBySynergizId(synergizId);

        return candidateService.getCandidatesByEmployee(employee);
    }

    @GetMapping("/getByStatusAndEmployee/{synergizId}/{statusId}")
    public List<Candidate> getCandidatesByStatusAndEmployee (@PathVariable String synergizId, @PathVariable Integer statusId) {
        Employee employee = employeeService.getEmployeeBySynergizId (synergizId);
        CandidateStatus status = candidateStatusService.getById(statusId);

        return candidateService.getCandidatesByEmployeeAndStatus(employee, status);
    }

    @GetMapping("/getCandidateStatusCount/{jobId}")
    public List<Object> countCandidateStatus (@PathVariable Integer jobId) {
        Job job = jobService.getById(jobId);
        return candidateService.countCandidateStatusByJob(job);
    }

    @PostMapping("/add")
    public Candidate add(@RequestBody Candidate candidate) {
        return candidateService.saveCandidate(candidate);
    }

//    @PostMapping("/process-excel")
//    public void processExcel (@RequestParam("file") MultipartFile excel, @RequestParam("jobId") Integer jobId) {
//        try {
//            if (jobId != -1) {
//                Job job = jobService.getById(jobId);
//                candidateService.processExcelData(excel, job);
//            }
//            else {
//                candidateService.processExcelData(excel);
//            }
//        }
//        catch (IOException e) {
//            e.printStackTrace();
//            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error processing file", e);
//        }
//    }
}
