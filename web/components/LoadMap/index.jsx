import React from "react";
import { Container, Form, ListGroup } from "react-bootstrap";

const LoadMap = () => {
  return (
    <Container
      className="contentWrapper section pp-scrollable flex-column d-flex h-screen align-items-center justify-content-center pt-5 mb-5"
      fluid
      data-aos="zoom-in"
      data-aos-duration="2000"
    >
      <div className="loadmap-section" id="RoadMapSection">
        <div className="loadmap-section-header">
          <div className="sec-title">
            <div className="sec-title-bg">Mint RoadMap</div>
            <div className="sec-title-fg">Mint RoadMap</div>
          </div>
        </div>
        <div className="roadmap-section d-flex  w-100 ">
          <div className="roadmap-section-container">
            <div className="roadmap-section-data">2022 Q1</div>
            <div className="roadmap-section-items d-flex flex-column">
              <div className="roadmap-section-item">
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    checked
                    disabled
                    label="Market feasibility research"
                  />
                </Form.Group>
              </div>
              <div className="roadmap-section-item">
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    checked
                    disabled
                    label="Preseed capital structuring"
                  />
                </Form.Group>
              </div>
            </div>
          </div>
          <div className="roadmap-section-container">
            <div className="roadmap-section-data">2022 Q2</div>
            <div className="roadmap-section-items d-flex flex-column">
              <div className="roadmap-section-item">
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    disabled
                    checked
                    label="Establish Branding Foundation"
                  />
                </Form.Group>
              </div>
              <div className="roadmap-section-item">
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    disabled
                    checked
                    label="Core web development/blockchain integration"
                  />
                </Form.Group>
              </div>
              <div className="roadmap-section-item">
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    disabled
                    checked
                    label="Early Access Begins"
                  />
                </Form.Group>
                <ListGroup>
                  <ListGroup.Item>
                    <span>•</span>Open Whitelist – Founding membership token
                    (Presale)
                  </ListGroup.Item>
                </ListGroup>
              </div>
              <div className="roadmap-section-item">
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    disabled
                    checked
                    label="CryptoKiddies community building"
                  />
                </Form.Group>
                <ListGroup>
                  <ListGroup.Item>
                    <span>•</span>Open Waitlist - Discord Access
                  </ListGroup.Item>
                </ListGroup>
              </div>
              <div className="roadmap-section-item">
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    disabled
                    label="Initial Membership Token Release"
                  />
                </Form.Group>
                <ListGroup>
                  <ListGroup.Item>
                    <span>•</span>Pre Sale Launch
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span>•</span>Giveaway Campaigns
                  </ListGroup.Item>
                </ListGroup>
              </div>
              <div className="roadmap-section-item">
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    disabled
                    label="Seed Round / Capital Fundraising"
                  />
                </Form.Group>
              </div>
              <div className="roadmap-section-item">
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    disabled
                    label="Expand CryptoKiddies"
                  />
                </Form.Group>
              </div>
            </div>
          </div>
          <div className="roadmap-section-container">
            <div className="roadmap-section-data">2022 Q2 / Q3 </div>
            <div className="roadmap-section-items d-flex flex-column">
              <div className="roadmap-section-item">
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    disabled
                    label="Digital Content Collaboration Begins"
                  />
                </Form.Group>
              </div>
              <div className="roadmap-section-item">
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    disabled
                    label="Real Estates Contents Acquisition "
                  />
                </Form.Group>
              </div>
              <div className="roadmap-section-item">
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    disabled
                    label="CryptoKiddies utility/governance token launch"
                  />
                </Form.Group>
                <ListGroup>
                  <ListGroup.Item>
                    <span>•</span>Airdrop to selected membership token holder
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span>•</span>Private Round
                  </ListGroup.Item>
                </ListGroup>
              </div>
              <div className="roadmap-section-item">
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    disabled
                    label="Fractional Ownership NFT release"
                  />
                </Form.Group>
                <ListGroup>
                  <ListGroup.Item>
                    <span>•</span>Airdrop to selected membership token holders
                  </ListGroup.Item>
                </ListGroup>
              </div>
              <div className="roadmap-section-item">
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    disabled
                    label="MVP development"
                  />
                </Form.Group>
              </div>
            </div>
          </div>
          <div className="roadmap-section-container">
            <div className="roadmap-section-data">2022 Q3</div>
            <div className="roadmap-section-items d-flex flex-column">
              <div className="roadmap-section-item">
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    disabled
                    label="Community Expansion Period"
                  />
                </Form.Group>
              </div>
              <div className="roadmap-section-item">
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    disabled
                    label="Finalize Brand Identity"
                  />
                </Form.Group>
              </div>
              <div className="roadmap-section-item">
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    disabled
                    label="Opening of MVP Division"
                  />
                </Form.Group>
                <ListGroup>
                  <ListGroup.Item>
                    <span>•</span>Digital Contents
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span>•</span>Marketplace Opening
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span>•</span>Fractional Ownership NFT
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span>•</span>Giveaways / Promotions / Merch
                  </ListGroup.Item>
                </ListGroup>
              </div>
              <div className="roadmap-section-item">
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    disabled
                    label="Initial Membership Token"
                  />
                </Form.Group>
                <ListGroup>
                  <ListGroup.Item>
                    <span>•</span>Public Round
                  </ListGroup.Item>
                </ListGroup>
              </div>
              <div className="roadmap-section-item">
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    disabled
                    label="CryptoKiddies utility/governance token Public Sale"
                  />
                </Form.Group>
              </div>
            </div>
          </div>
          <div className="roadmap-section-container">
            <div className="roadmap-section-data">Q4 2022 - Q1 2023</div>
            <div className="roadmap-section-items d-flex flex-column">
              <div className="roadmap-section-item">
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" disabled label="MVP Refining" />
                </Form.Group>
              </div>
              <div className="roadmap-section-item">
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    disabled
                    label="Team Expansion "
                  />
                </Form.Group>
              </div>
              <div className="roadmap-section-item">
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    disabled
                    label="Content Expansion"
                  />
                </Form.Group>
              </div>
              <div className="roadmap-section-item">
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    disabled
                    label="Prep For Launch"
                  />
                </Form.Group>
              </div>
            </div>
          </div>
          <div className="roadmap-section-container">
            <div className="roadmap-section-data">Q4 2022 - Q1 2023</div>
            <div className="roadmap-section-items d-flex flex-column">
              <div className="roadmap-section-item">
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    disabled
                    label="Platform Launch To The Public"
                  />
                </Form.Group>
                <ListGroup>
                  <ListGroup.Item>
                    <span>•</span>Expand Community
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span>•</span>Expand Contents
                  </ListGroup.Item>
                </ListGroup>
              </div>
              <div className="roadmap-section-item">
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    disabled
                    label="International Real Estate Projects"
                  />
                </Form.Group>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default LoadMap;
