package hr_module.backend.service;

import hr_module.backend.model.primary.*;
import hr_module.backend.service.CandidateStatusService;
import hr_module.backend.model.secondary.EmployeeDetails;
import hr_module.backend.repository.primary.CandidateRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Date;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@Service
public class CandidateServiceImpl implements CandidateService{

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private CandidateStatusService candidateStatusService;

    @Autowired
    private LocationService locationService;

    @Autowired
    private QualificationService qualificationService;

    @Autowired
    private DisciplineService disciplineService;

    @PersistenceContext(unitName = "secondaryEntityManagerFactory")
    private EntityManager secondaryEm;

    @Override
    public Candidate saveCandidate(Candidate candidate) {
        return candidateRepository.save(candidate);
    }

    @Override
    @Transactional(value = "primaryTransactionManager", readOnly = true)
    public List<Candidate> getAllCandidates() {
        List<Candidate> candidateList =  candidateRepository.findAll();

        for (Candidate candidate : candidateList) {
            Employee employee = candidate.getEmployee();

            if (employee != null && employee.getSynergizId() != null) {
                EmployeeDetails details = secondaryEm.find(EmployeeDetails.class, employee.getSynergizId());
                employee.setEmployeeDetails(details);
            }
        }

        return candidateList;
    }

    @Override
    @Transactional(value = "primaryTransactionManager", readOnly = true)
    public List<Candidate> getCandidatesByStatus(CandidateStatus candidateStatus) {
        List<Candidate> candidateList =  candidateRepository.findByCandidateStatus (candidateStatus);

        for (Candidate candidate : candidateList) {
            Employee employee = candidate.getEmployee();

            if (employee != null && employee.getSynergizId() != null) {
                EmployeeDetails details = secondaryEm.find(EmployeeDetails.class, employee.getSynergizId());
                employee.setEmployeeDetails(details);
            }
        }

        return candidateList;
    }

    @Override
    public List<Candidate> getCandidatesByEmployee(Employee employee) {
        List<Candidate> candidateList = candidateRepository.findCandidatesByEmployee(employee);

        for (Candidate candidate : candidateList) {
            Employee employee1 = candidate.getEmployee();

            if (employee1 != null && employee1.getSynergizId() != null) {
                EmployeeDetails details = secondaryEm.find(EmployeeDetails.class, employee1.getSynergizId());
                employee1.setEmployeeDetails(details);
            }
        }

        return candidateList;
    }

    @Override
    public Candidate getById(Integer id) {
        Candidate candidate = candidateRepository.findById(id)
                                  .orElseThrow(()-> new NoSuchElementException("Candidate Not Found"));

        Employee employee = candidate.getEmployee();

        if (employee != null && employee.getSynergizId() != null) {
            EmployeeDetails details = secondaryEm.find(EmployeeDetails.class, employee.getSynergizId());
            employee.setEmployeeDetails(details);
        }

        return candidate;
    }

    @Override
    public List<Candidate> getCandidatesByEmployeeAndStatus (Employee employee, CandidateStatus status) {
        List<Candidate> candidateList = candidateRepository.findCandidatesByEmployeeAndStatus(employee, status);

        for (Candidate candidate : candidateList) {
            Employee employee1 = candidate.getEmployee();

            if (employee1 != null && employee1.getSynergizId() != null) {
                EmployeeDetails details = secondaryEm.find(EmployeeDetails.class, employee1.getSynergizId());
                employee1.setEmployeeDetails(details);
            }
        }

        return candidateList;
    }

    @Override
    public List<Object> countCandidateStatusByJob(Job job) {
        return candidateRepository.countCandidateStatusByJob(job);
    }

//    @Override
//    public void processExcelData(MultipartFile file) throws IOException {
//        // Validate file
//        if (file.isEmpty()) {
//            throw new IOException("File is empty. Please upload a valid Excel file.");
//        }
//
//        // Check if the file is an Excel file based on content type and extension
//        String fileType = file.getContentType();
//        if (!(fileType.equals("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") ||
//                fileType.equals("application/vnd.ms-excel"))) {
//            throw new IOException("Invalid file type. Please upload an Excel file with .xlsx or .xls extension.");
//        }
//
//        CandidateStatus ongoingStatus = candidateStatusService.getById(3);
//
//        try (XSSFWorkbook workbook = new XSSFWorkbook(file.getInputStream())) {
//            XSSFSheet sheet = workbook.getSheetAt(0);
//            DataFormatter dataFormatter = new DataFormatter();
//
//            for (int rowIndex = 1; rowIndex <= sheet.getLastRowNum(); rowIndex++) {
//                Row row = sheet.getRow(rowIndex);
//                if (row == null) continue;
//
//                String firstName = dataFormatter.formatCellValue(row.getCell(0));
//                String lastName = dataFormatter.formatCellValue(row.getCell(1));
//                String phoneNo = dataFormatter.formatCellValue(row.getCell(2));
//                String email = dataFormatter.formatCellValue(row.getCell(3));
//                String locationName = dataFormatter.formatCellValue(row.getCell(4));
//                String qualificationName = dataFormatter.formatCellValue(row.getCell(5));
//                String disciplineName = dataFormatter.formatCellValue(row.getCell(6));
//                float totalWorkExperience = (float) row.getCell(7).getNumericCellValue();
//                float currentCTC = (float) row.getCell(8).getNumericCellValue();
//                float expectedCTC = (float) row.getCell(9).getNumericCellValue();
//
//                // Handle location
//                Location location = locationService.getOrCreateLocation(locationName);
//
//                // Handle qualification
//                Qualification qualification = qualificationService.getOrCreateQualification(qualificationName);
//
//                // Handle discipline
//                Discipline discipline = disciplineService.getOrCreateDiscipline(disciplineName);
//
//                // Create candidate object with all remarks set to "" and status set to {3, "Ongoing"}
//                Candidate candidate = new Candidate(
//                        firstName, lastName, location, totalWorkExperience, qualification, discipline,
//                        null,
//                        phoneNo, email, expectedCTC, currentCTC,
//                        "",
//                        ongoingStatus,
//                        new Date(System.currentTimeMillis()),
//                        null,
//                        null,
//                        ongoingStatus,
//                        "",
//                        "",
//                        null,
//                        "",
//                        0.0f,
//                        ongoingStatus,
//                        "",
//                        null,
//                        ongoingStatus,
//                        "",
//                        ongoingStatus,
//                        null,
//                        null,
//                        "",
//                        ""
//                );
//
//                saveCandidate(candidate);
//            }
//        }
//    }
//
//    @Override
//    public void processExcelData(MultipartFile file, Job job) throws IOException {
//        // Validate file
//        if (file.isEmpty()) {
//            throw new IOException("File is empty. Please upload a valid Excel file.");
//        }
//
//        // Check if the file is an Excel file based on content type and extension
//        String fileType = file.getContentType();
//        if (!(fileType.equals("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") ||
//                fileType.equals("application/vnd.ms-excel"))) {
//            throw new IOException("Invalid file type. Please upload an Excel file with .xlsx or .xls extension.");
//        }
//
//        CandidateStatus ongoingStatus = candidateStatusService.getById(3);
//
//        try (XSSFWorkbook workbook = new XSSFWorkbook(file.getInputStream())) {
//            XSSFSheet sheet = workbook.getSheetAt(0);
//            DataFormatter dataFormatter = new DataFormatter();
//
//            for (int rowIndex = 1; rowIndex <= sheet.getLastRowNum(); rowIndex++) {
//                Row row = sheet.getRow(rowIndex);
//                if (row == null) continue;
//
//                String firstName = dataFormatter.formatCellValue(row.getCell(0));
//                String lastName = dataFormatter.formatCellValue(row.getCell(1));
//                String phoneNo = dataFormatter.formatCellValue(row.getCell(2));
//                String email = dataFormatter.formatCellValue(row.getCell(3));
//                String locationName = dataFormatter.formatCellValue(row.getCell(4));
//                String qualificationName = dataFormatter.formatCellValue(row.getCell(5));
//                String disciplineName = dataFormatter.formatCellValue(row.getCell(6));
//                // Add null checks for numeric cells
//                Cell totalWorkExperienceCell = row.getCell(7);
//                float totalWorkExperience = totalWorkExperienceCell != null
//                        ? (float) totalWorkExperienceCell.getNumericCellValue()
//                        : 0.0f; // Set default value if the cell is null
//
//                Cell currentCTCCell = row.getCell(8);
//                float currentCTC = currentCTCCell != null
//                        ? (float) currentCTCCell.getNumericCellValue()
//                        : 0.0f;
//
//                Cell expectedCTCCell = row.getCell(9);
//                float expectedCTC = expectedCTCCell != null
//                        ? (float) expectedCTCCell.getNumericCellValue()
//                        : 0.0f;
//
//                // Handle location
//                Location location = locationService.getOrCreateLocation(locationName);
//
//                // Handle qualification
//                Qualification qualification = qualificationService.getOrCreateQualification(qualificationName);
//
//                // Handle discipline
//                Discipline discipline = disciplineService.getOrCreateDiscipline(disciplineName);
//
//                // Create candidate object with all remarks set to "" and status set to {3, "Ongoing"}
//                Candidate candidate = new Candidate(
//                        firstName, lastName, location, totalWorkExperience, qualification, discipline,
//                        job.getCategory(),
//                        phoneNo, email, expectedCTC, currentCTC,
//                        "",
//                        ongoingStatus,
//                        new Date(System.currentTimeMillis()),
//                        job,
//                        null,
//                        ongoingStatus,
//                        "",
//                        "",
//                        null,
//                        "",
//                        0.0f,
//                        ongoingStatus,
//                        "",
//                        null,
//                        ongoingStatus,
//                        "",
//                        ongoingStatus,
//                        null,
//                        null,
//                        "",
//                        ""
//                );
//
//                saveCandidate(candidate);
//            }
//        }
//    }
}
