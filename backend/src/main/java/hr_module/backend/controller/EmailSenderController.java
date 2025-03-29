package hr_module.backend.controller;

import hr_module.backend.model.primary.Email;
import hr_module.backend.service.EmailSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/mail")
@CrossOrigin
public class EmailSenderController {
    @Autowired
    private EmailSenderService emailSenderService;

    @PostMapping ("/send")
    public String sendEmail (@RequestBody Email email) {
        emailSenderService.sendEmail(email.getToEmail(), email.getSubject(), email.getBody());
        return "Email send successfully!";
    }
}
