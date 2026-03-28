package hwr.backend1.spin;

import hwr.backend1.balance.BalanceService;
import hwr.backend1.spin.dto.BalanceResponseDTO;
import hwr.backend1.spin.dto.SpinRequestDTO;
import hwr.backend1.spin.dto.SpinResponseDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/spins")
public class SpinController {
    private final SpinService spinService;
    private final BalanceService balanceService;

    public SpinController(SpinService spinService, BalanceService balanceService) {
        this.spinService = spinService;
        this.balanceService = balanceService;
    }

    @PostMapping
    public ResponseEntity<SpinResponseDTO> createSpin(@RequestBody SpinRequestDTO request) {
        return ResponseEntity.ok(spinService.spin(request));
    }

    @GetMapping("/history")
    public ResponseEntity<List<SpinResponseDTO>> getSpinHistory() {
        return ResponseEntity.ok(spinService.getSpinHistory());
    }

    @GetMapping("/balance")
    public ResponseEntity<BalanceResponseDTO> getCurBalance() {
        return ResponseEntity.ok(new BalanceResponseDTO(balanceService.getCurrentBalance()));
    }
}
