package hwr.backend1.paytable;

import hwr.backend1.paytable.dto.PaytableResponse;

import java.util.List;

public interface PaytableService {
    /**
     * retrievePaytableList() retrieves a list of PaytableResponses so that the frontend
     * can render information regarding payouts and playing rules
     * @return List<PaytableResponse> List that contains symbols list with payout information
     */
    List<PaytableResponse> retrievePaytableList();
}
