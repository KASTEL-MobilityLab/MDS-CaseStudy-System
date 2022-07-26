
import parser from "stream-json";
import pick from "stream-json/filters/Pick.js";
import chain from "stream-chain";
import fs from "fs";


const pipeline = chain([
  fs.createReadStream('provider_BSE_status_changes_20220708T050000Z_20220708T210000Z.json'),
  parser(),
  pick({filter: 'data.status_changes'}),
  streamValues(),
  data => {
    const value = data.value;
    console.log(data.device_id);
    // keep data only for the accounting department
    //return value && value.department === 'accounting' ? data : null;
  }
]);

//let counter = 0;
//pipeline.on('data', () => ++counter);
//pipeline.on('end', () =>
//  console.log(`The accounting department has ${counter} employees.`));
