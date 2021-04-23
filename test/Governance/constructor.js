

describe('Governance deployment', accounts => {
    xit('should deploy with valid address');
    xit('should set correct governance admin and executor with timelock admin');
    xit('should set correct voting delay');
    xit('should return correct total propostion power from governance strategy');
    xit('should get correct minimum proposition power');
    xit('should set correct quorum');
    xit('should set correct voting power');
    xit('should get correct grace period');
    xit('should get correct exection delay');
    xit('should set correct voting delay');
    xit('should check if user has enough proposition power');
    xit('should create valid proposal');
    xit('should validate proposal creator');

    //proposal states
    xit('should estimate voting outcome for user based on token amount');

    xit('should create valid proposal');
    xit('shold return valid proposal information after proposal creation');
    xit('pending proposal');
    xit('active proposal');
    xit('failed proposal');
    xit('canceled proposal');
    xit('succeeded proposal');
    xit('queued proposal');
    xit('executed proposal');
    xit('expired proposal');

    //voting
    xit('approve tokens to swap before voting');
    xit('vote should fail, if tokens to swap are not approved');
    xit('should lock correct amount of tokens after voting');
    xit('should get correct amount of lock tokens after voting');
    xit('should redeem correct amount of lock tokens after voting');
    xit('should not redeem correct amount of lock tokens after voting if voting tokens are transferred');
    xit('should get correct votes and bool support for voter');


    // events 
    xit('should emit correct event and parameters after proposal creation');
    xit('should emit correct event and parameters after proposal cancelation');
    xit('should emit correct event and parameters after proposal queued');
    xit('should emit correct event and parameters after proposal executed');
    xit('should emit correct event and parameters after voting');
    xit('should emit correct event and parameters after governance strategy is changed');
    xit('should emit correct event and parameters after voting delay changed');

    xit('should emit correct event and parameters after voting by signature');
    
    xit('should emit correct event and parameters after executor authorised');
    xit('should emit correct event and parameters after executor unauthorised');
    xit('should emit correct event and parameters after voting token set');
    xit('should emit correct event and parameters after voting tokens locked');
    xit('should emit correct event and parameters after voting tokens redeemed');

});