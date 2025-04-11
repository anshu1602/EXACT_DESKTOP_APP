# E:\EXACT_DESKTOP_APP-20250324T050853Z-001\EXACT_DESKTOP_APP\backend\generate_test_plan.py
import os

def generate_jmeter_test_plan(user_input, test_type):
    try:
        api_endpoint = user_input.get("api_endpoint", "")
        num_users = user_input.get("num_users", 100)
        ramp_up = user_input.get("ramp_up", 60)
        duration = user_input.get("duration", 300)

        # Dummy implementation for generating a test plan
        jmx_filename = f"test_plan_{test_type}_{int(os.times().elapsed)}.jmx"
        jmx_content = f"""
        <jmeterTestPlan version="1.2" properties="5.0" jmeter="5.6.3">
          <hashTree>
            <TestPlan guiclass="TestPlanGui" testclass="TestPlan" testname="Test Plan" enabled="true">
              <stringProp name="TestPlan.comments">Generated Test Plan for {test_type}</stringProp>
              <boolProp name="TestPlan.functional_mode">false</boolProp>
              <boolProp name="TestPlan.serialize_threadgroups">false</boolProp>
              <elementProp name="TestPlan.user_defined_variables" elementType="Arguments" guiclass="ArgumentsPanel" testclass="Arguments" testname="User Defined Variables" enabled="true">
                <collectionProp name="Arguments.arguments"/>
              </elementProp>
              <stringProp name="TestPlan.user_define_classpath"></stringProp>
            </TestPlan>
            <hashTree>
              <ThreadGroup guiclass="ThreadGroupGui" testclass="ThreadGroup" testname="Thread Group" enabled="true">
                <stringProp name="ThreadGroup.on_sample_error">continue</stringProp>
                <elementProp name="ThreadGroup.main_controller" elementType="LoopController" guiclass="LoopControlPanel" testclass="LoopController" testname="Loop Controller" enabled="true">
                  <boolProp name="LoopController.continue_forever">false</boolProp>
                  <stringProp name="LoopController.loops">1</stringProp>
                </elementProp>
                <stringProp name="ThreadGroup.num_threads">{num_users}</stringProp>
                <stringProp name="ThreadGroup.ramp_time">{ramp_up}</stringProp>
                <longProp name="ThreadGroup.start_time"></longProp>
                <longProp name="ThreadGroup.end_time"></longProp>
                <boolProp name="ThreadGroup.scheduler">true</boolProp>
                <stringProp name="ThreadGroup.duration">{duration}</stringProp>
                <stringProp name="ThreadGroup.delay"></stringProp>
              </ThreadGroup>
              <hashTree>
                <HTTPSamplerProxy guiclass="HttpTestSampleGui" testclass="HTTPSamplerProxy" testname="HTTP Request" enabled="true">
                  <elementProp name="HTTPsampler.Arguments" elementType="Arguments" guiclass="HTTPArgumentsPanel" testclass="Arguments" enabled="true">
                    <collectionProp name="Arguments.arguments"/>
                  </elementProp>
                  <stringProp name="HTTPSampler.domain"></stringProp>
                  <stringProp name="HTTPSampler.port"></stringProp>
                  <stringProp name="HTTPSampler.protocol"></stringProp>
                  <stringProp name="HTTPSampler.path">{api_endpoint}</stringProp>
                  <stringProp name="HTTPSampler.method">GET</stringProp>
                  <boolProp name="HTTPSampler.follow_redirects">true</boolProp>
                  <boolProp name="HTTPSampler.auto_redirects">false</boolProp>
                  <boolProp name="HTTPSampler.use_keepalive">true</boolProp>
                  <boolProp name="HTTPSampler.DO_MULTIPART_POST">false</boolProp>
                  <stringProp name="HTTPSampler.embedded_url_re"></stringProp>
                  <stringProp name="HTTPSampler.connect_timeout"></stringProp>
                  <stringProp name="HTTPSampler.response_timeout"></stringProp>
                </HTTPSamplerProxy>
                <hashTree/>
              </hashTree>
            </hashTree>
          </hashTree>
        </jmeterTestPlan>
        """

        # Save the JMX file
        jmx_file_path = os.path.join("jmx_files", jmx_filename)
        with open(jmx_file_path, "w") as f:
            f.write(jmx_content)

        return {"status": "success", "jmx_filename": jmx_filename}, 200
    except Exception as e:
        return {"status": "error", "message": str(e)}, 500