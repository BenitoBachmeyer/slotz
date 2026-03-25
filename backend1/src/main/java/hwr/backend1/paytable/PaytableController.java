package hwr.backend1.paytable;

import hwr.backend1.paytable.dto.PaytableResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PaytableController {

    private final PaytableService paytableService;

    public PaytableController(PaytableService paytableService) {
        this.paytableService = paytableService;
    }

    @GetMapping("/paytable")
    public ResponseEntity<?> retrievePaytableStats() {
        List<PaytableResponse> list = paytableService.retrievePaytableList();

        return ResponseEntity.ok(list);
    }
}