const template = "{\"stream_name\": \"driver_data\", \"version\": 0, \"stream_token\": \"abc123\", \"timestamp\": null, \"measures\": {\"location\": {\"val\": null, \"dtype\": \"varchar(60)\"}}, \"fields\": {\"region-code\": {}}, \"user_ids\": {\"driver-id\": {}, \"id\": {}}, \"tags\": {}, \"foreign_keys\": [], \"filters\": [{\"func_type\": \"filter_data\", \"func_name\": \"ButterLowpass\", \"filter_name\": \"buttery_location\", \"func_params\": {\"order\": 2, \"nyquist\": 0.05}, \"measures\": [\"location\"]}, {\"func_type\": \"filter_data\", \"func_name\": \"WindowAverage\", \"filter_name\": \"window_location\", \"func_params\": {\"window_len\": 3}, \"measures\": [\"location\"]}], \"dparam_rules\": [{\"func_name\": \"DeriveHeading\", \"func_type\": \"derive_param\", \"func_params\": {\"window\": 1, \"units\": \"deg\", \"heading_type\": \"bearing\", \"swap_lon_lat\": true}, \"measure_rules\": {\"spatial_measure\": \"location\", \"output_name\": \"bears\"}, \"measures\": [\"location\"]}, {\"func_name\": \"DeriveChange\", \"func_type\": \"derive_param\", \"func_params\": {\"window\": 1, \"angle_change\": true}, \"measure_rules\": {\"target_measure\": \"bears\", \"output_name\": \"change_in_heading\"}, \"derived_measures\": [\"bears\"]}], \"event_rules\": {\"ninety_degree_turn\": {\"func_type\": \"detect_event\", \"func_name\": \"DetectThreshold\", \"event_rules\": {\"measure\": \"change_in_heading\", \"threshold_value\": 15, \"comparison_operator\": \">=\"}, \"event_name\": \"ninety_degree_turn\", \"stream_token\": null, \"derived_measures\": [\"change_in_heading\"]}}, \"storage_rules\":{\"store_raw\":true, \"store_filtered\":true, \"store_derived\":true}, \"engine_rules\":{\"kafka\":\"test\"}}";

let data = "{\"stream_name\": \"driver_data\", \"version\": 0, \"stream_token\": \"abc123\", \"timestamp\": 1510603551106, \"measures\": {\"location\": {\"val\": [-122.68238290490505, 45.515495715938535], \"dtype\": \"varchar(60)\"}}, \"fields\": {\"region-code\": \"PDX\"}, \"user_ids\": {\"driver-id\": \"Adrian Nielsen\", \"id\": 26}, \"tags\": {}, \"foreign_keys\": [], \"filters\": [{\"func_type\": \"filter_data\", \"func_name\": \"ButterLowpass\", \"filter_name\": \"buttery_location\", \"func_params\": {\"order\": 2, \"nyquist\": 0.05}, \"measures\": [\"location\"]}, {\"func_type\": \"filter_data\", \"func_name\": \"WindowAverage\", \"filter_name\": \"window_location\", \"func_params\": {\"window_len\": 3}, \"measures\": [\"location\"]}], \"dparam_rules\": [{\"func_name\": \"DeriveHeading\", \"func_type\": \"derive_param\", \"func_params\": {\"window\": 1, \"units\": \"deg\", \"heading_type\": \"bearing\", \"swap_lon_lat\": true}, \"measure_rules\": {\"spatial_measure\": \"location\", \"output_name\": \"bears\"}, \"measures\": [\"location\"]}, {\"func_name\": \"DeriveChange\", \"func_type\": \"derive_param\", \"func_params\": {\"window\": 1, \"angle_change\": true}, \"measure_rules\": {\"target_measure\": \"bears\", \"output_name\": \"change_in_heading\"}, \"derived_measures\": [\"bears\"]}], \"event_rules\": {\"ninety_degree_turn\": {\"func_type\": \"detect_event\", \"func_name\": \"DetectThreshold\", \"event_rules\": {\"measure\": \"change_in_heading\", \"threshold_value\": 15, \"comparison_operator\": \">=\"}, \"event_name\": \"ninety_degree_turn\", \"stream_token\": null, \"derived_measures\": [\"change_in_heading\"]}}, \"storage_rules\": {\"store_raw\": true, \"store_filtered\": true, \"store_derived\": true}}";
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function test() {
  console.log('EVENT!');
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const client = StromClient();

client._ping();

client.registerDevice('device-1', template, ['one', 'two', 'three']);

// client.registerEvent('turn-90', this, test);

f_data = client.formatData(template, data);

client.process('device-1', 'one', f_data);

console.log(client.tokens);
console.log(client.tokens['device-1']);
